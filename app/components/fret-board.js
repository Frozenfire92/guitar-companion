import SVGComponent from './svg-base';
import { computed, get } from '@ember/object';
import { alias, equal } from '@ember/object/computed';
import { inject as service } from '@ember/service';

const dotPositions = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];

export default SVGComponent.extend({
  // Element
  classNames: ['fret-board'],

  // Services
  storage: service(),

  width: 1000,
  height: 300,
  padding: 25,

  numberOfStrings: 6,
  numberOfFrets: 16,
  stringWidth: 4,
  barWidth: 12,
  fretWidth: 2,
  markerRadius: 15,
  fingerRadius: 20,

  viewBox: computed('width', 'height', function () {
    return `0 0 ${get(this, 'width')} ${get(this, 'height')}`;
  }),

  minX: alias('padding'),
  maxX: computed('width', 'padding', function () {
    return get(this, 'width') - get(this, 'padding');
  }),

  minY: alias('padding'),
  maxY: computed('height', 'padding', function () {
    return get(this, 'height') - get(this, 'padding');
  }),

  leftHanded: equal('storage.hand', 'left'),

  stringPositions: computed('numberOfStrings', 'padding', 'minY', 'maxY', function(){
    let padding = get(this, 'padding');
    let numberOfStrings = get(this, 'numberOfStrings');
    let totalDistance = get(this, 'maxY') - get(this, 'minY');
    let a = [];
    for (let i = 0; i < numberOfStrings; i++) {
      a.pushObject(
        ((i / (numberOfStrings - 1)) * totalDistance) + padding
      );
    }
    return a;
  }),

  fretPositions: computed('numberOfFrets', 'padding', 'minX', 'maxX', function () {
    let padding = get(this, 'padding');
    let numberOfFrets = get(this, 'numberOfFrets');
    let totalDistance = get(this, 'maxX') - get(this, 'minX');
    let a = [];
    for (let i = 0; i < numberOfFrets; i++) {
      a.pushObject(
        ((i / (numberOfFrets - 1)) * totalDistance) + padding
      );
    }
    return a;
  }),

  markerPositions: computed(function(){
    let stringPositions = get(this, 'stringPositions');
    let fretPositions = get(this, 'fretPositions');
    let r = get(this, 'markerRadius');
    return dotPositions
      .map((dotIndex)=>{
        let cx = (fretPositions[dotIndex] + fretPositions[dotIndex + 1]) / 2;
        let cy = (stringPositions[2] + stringPositions[3]) / 2;
        if (cx) {
          return {
            cx,
            cy,
            r
          };
        }
      })
      .compact();
  }),

  placements: computed('leftHanded', 'chord', 'showChord', function(){
    let showChord = get(this, 'showChord');
    let chord = get(this, 'chord');
    if (showChord && chord) {
      let leftHanded = get(this, 'leftHanded');
      let hasBar = !!get(this, 'chord.bar');
      return hasBar
        ? leftHanded
          ? get(this, 'chord.placements')
          : get(this, 'chord.placements').slice().reverse()
        : leftHanded
          ? get(this, 'chord.placements')
          : get(this, 'chord.placements').slice().reverse();
    }
    return [];
  }),

  fingerings: computed('leftHanded', 'chord.fingerings.[]', 'showChord', function () {
    let showChord = get(this, 'showChord');
    if (showChord) {
      // let leftHanded = get(this, 'leftHanded');
      return get(this, 'chord.fingerings');
    }
  }),

  fingerOffset: computed('fretPositions', function () {
    let positions = get(this, 'fretPositions');
    return (positions[1] - positions[0]) / 2;
  }),

  fingerPositions: computed('stringPositions.[]', 'fretPostions.[]', 'fingerRadius', 'placements.[]', 'fingerings.[]', 'fingerOffset', function () {
    let stringPositions = get(this, 'stringPositions');
    let fretPositions = get(this, 'fretPositions');
    let radius = get(this, 'fingerRadius');
    let fingerOffset = get(this, 'fingerOffset');
    let fingerings = get(this, 'fingerings');
    return get(this, 'placements').map((placement, i) => {
      if (placement > 0) {
        return {
          cx: fretPositions[placement] - fingerOffset,
          cy: stringPositions[i],
          r: radius,
          finger: fingerings[i]
        }
      }
    }).compact();
  }),

  bar: computed('leftHanded', 'numberOfStrings', 'chord.bar', 'fretPositions.[]', 'stringPositions.[]', 'showChord', function () {
    let bar = get(this, 'chord.bar');
    let numberOfStrings = get(this, 'numberOfStrings');
    let showChord = get(this, 'showChord');
    if (bar && showChord) {
      let cleanBar = bar;
      if (!get(this, 'leftHanded')) {
        cleanBar = Object.assign({}, bar);
        cleanBar.start = this.barReverse(bar.end, numberOfStrings - 1);
        cleanBar.end = this.barReverse(bar.start, numberOfStrings - 1);
      }

      let fretPositions = get(this, 'fretPositions');
      let stringPositions = get(this, 'stringPositions');
      let radius = get(this, 'fingerRadius');
      let height = radius * 2;
      let r = {
        x: fretPositions[cleanBar.fret - 1] + 15,
        y: stringPositions[cleanBar.start] - radius,
        width: height,
        height: (stringPositions[cleanBar.end] - stringPositions[cleanBar.start]) + height,
        rx: 25,
        ry: 25
      };
      return r;
    }
    else {
      return null;
    }
  }),

  // Helpers
  barReverse(index, length) {
    let k = 0;
    for (let i = length; i >= 0; i--) {
      if (i === index) return k;
      k++;
    }
  }
});
