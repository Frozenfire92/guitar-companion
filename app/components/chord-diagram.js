import SVGComponent from './svg-base';
import { computed, get } from '@ember/object';
import { alias, equal } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default SVGComponent.extend({
  // Element
  classNames: ['chord-diagram'],

  // Services
  storage: service(),

  // Properties
  chord: null,

  orientation: alias('storage.chordDiagramOrientation'),
  numberOfFrets: 6,
  padding: 25,
  stringWidth: 4,
  barWidth: 12,
  fretWidth: 2,
  radius: 20,
  textInFinger: alias('storage.chordDiagramTextInFinger'),
  fingeringTextOutside: alias('storage.chordDiagramFingeringTextOutside'),
  fingeringOnTop: alias('storage.chordDiagramFingeringOnTop'),

  // Computeds
  width: computed('isHorizontal', function () {
    return get(this, 'isHorizontal') ? 350 : 300;
  }),
  height: computed('isHorizontal', function () {
    return get(this, 'isHorizontal') ? 300 : 350;
  }),

  viewBox: computed('width', 'height', function(){
    return `0 0 ${get(this, 'width')} ${get(this, 'height')}`;
  }),

  minX: alias('padding'),
  maxX: computed('width', 'padding', function(){
    return get(this, 'width') - get(this, 'padding');
  }),

  minY: alias('padding'),
  maxY: computed('height', 'padding', function () {
    return get(this, 'height') - get(this, 'padding');
  }),

  numberOfStrings: alias('chord.adjustedPlacements.length'),
  isHorizontal: equal('orientation', 'horizontal'),
  leftHanded: equal('storage.hand', 'left'),

  placements: computed('isHorizontal', 'leftHanded', 'chord.adjustedPlacements.[]', function() {
    let adjustedPlacements = get(this, 'chord.adjustedPlacements');
    let isHorizontal = get(this, 'isHorizontal');
    return get(this, 'leftHanded')
      ? isHorizontal
        ? adjustedPlacements
        : adjustedPlacements.slice().reverse()
      : isHorizontal
        ? adjustedPlacements.slice().reverse()
        : adjustedPlacements;
  }),

  fingerings: computed('isHorizontal', 'leftHanded', 'chord.fingerings.[]', function() {
    let fingerings = get(this, 'chord.fingerings');
    let isHorizontal = get(this, 'isHorizontal');
    return get(this, 'leftHanded')
      ? isHorizontal
        ? fingerings
        : fingerings.slice().reverse()
      : isHorizontal
        ? fingerings.slice().reverse()
        : fingerings;
  }),

  stringPositions: computed('isHorizontal', 'numberOfStrings', 'padding', 'minX', 'maxX', 'minY', 'maxY', function(){
    let isHorizontal = get(this, 'isHorizontal');
    let padding = get(this, 'padding');
    let numberOfStrings = get(this, 'numberOfStrings');
    let a = [];
    let totalDistance = isHorizontal
      ? get(this, 'maxY') - get(this, 'minY')
      : get(this, 'maxX') - get(this, 'minX');
    for (let i = 0; i < numberOfStrings; i++) {
      a.pushObject(
        ((i / (numberOfStrings - 1)) * totalDistance) + padding
      );
    }
    return a;
  }),

  fretPositions: computed('isHorizontal', 'padding', 'numberOfFrets', 'minX', 'maxX', 'minY', 'maxY', function() {
    let isHorizontal = get(this, 'isHorizontal');
    let a = [];
    let padding = get(this, 'padding');
    let numberOfFrets = get(this, 'numberOfFrets');
    let totalDistance = isHorizontal
      ? get(this, 'maxX') - get(this, 'minX')
      : get(this, 'maxY') - get(this, 'minY');
    for (let i = 0; i < numberOfFrets; i++) {
      a.pushObject(
        ((i / (numberOfFrets - 1)) * totalDistance) + padding
      );
    }
    return a;
  }),

  fingerOffset: computed('fretPositions', function() {
    let positions = get(this, 'fretPositions');
    return (positions[1] - positions[0]) / 2;
  }),

  fingerPositions: computed('isHorizontal', 'stringPositions.[]', 'fretPostions.[]', 'radius', 'placements.[]', 'fingerings.[]', 'fingerOffset', function() {
    let isHorizontal = get(this, 'isHorizontal');
    let stringPositions = get(this, 'stringPositions');
    let fretPositions = get(this, 'fretPositions');
    let radius = get(this, 'radius');
    let fingerOffset = get(this, 'fingerOffset');
    let fingerings = get(this, 'fingerings');
    return get(this, 'placements').map((placement, i) => {
      if (placement > 0) {
        return {
          cx: isHorizontal
            ? fretPositions[placement] - fingerOffset
            : stringPositions[i],
          cy: isHorizontal
            ? stringPositions[i]
            : fretPositions[placement] - fingerOffset,
          r: radius,
          finger: fingerings[i]
        }
      }
    }).compact();
  }),

  bar: computed('isHorizontal', 'leftHanded', 'chord.bar', 'fretPositions.[]', 'stringPositions.[]', function() {
    let isHorizontal = get(this, 'isHorizontal');
    let bar = get(this, 'chord.bar');
    let numberOfStrings = get(this, 'numberOfStrings');
    if (bar) {
      let cleanBar = bar;
      if ((isHorizontal && !get(this, 'leftHanded')) || (!isHorizontal && get(this, 'leftHanded'))) {
        cleanBar = Object.assign({}, bar);
        cleanBar.start = this.barReverse(bar.end, numberOfStrings - 1);
        cleanBar.end = this.barReverse(bar.start, numberOfStrings - 1);
      }

      let fretPositions = get(this, 'fretPositions');
      let stringPositions = get(this, 'stringPositions');
      let radius = get(this, 'radius');
      let height = radius * 2;
      let r = {
        x: isHorizontal
          ? ((fretPositions[1] - fretPositions[0]) / 2) + 5
          : stringPositions[cleanBar.start] - radius,
        y: isHorizontal
          ? stringPositions[cleanBar.start] - radius
          : ((fretPositions[1] - fretPositions[0]) / 2) + 5,
        width: isHorizontal
          ? height
          : (stringPositions[cleanBar.end] - stringPositions[cleanBar.start]) + height,
        height: isHorizontal
          ? (stringPositions[cleanBar.end] - stringPositions[cleanBar.start]) + height
          : height,
        rx: 25,
        ry: 25
      };
      return r;
    }
    else {
      return null;
    }
  }),

  skippedStrings: computed('placements.[]', function() {
    return get(this, 'placements.[]')
      .map((n, i) => n === 'x' ? i : null)
      .compact();
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
