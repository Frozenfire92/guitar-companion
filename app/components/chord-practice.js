import Component from '@ember/component';
import { run } from '@ember/runloop';
import { computed, get, set } from '@ember/object';
import { inject as service } from '@ember/service';
import { randomIntInclusive } from 'guitar-companion/utils/math';

export default Component.extend({
  classNames: ['chord-practice'],

  store: service(),
  configOpen: true,
  mode: 'random',
  chord: null,
  interval: null,
  beat: 0,
  groups: null, // array
  strongBeats: null, //array
  audioContext: null,
  tempo: 60,
  time: 0,
  duration: 0.02,
  downbeat: 2500,
  strong: 2000,
  weak: 1500,
  tuner: 440,

  beatsPerMeasure: 4,

  selectOptions: null, //array

  allChords: computed(function () {
    return get(this, 'store').peekAll('chord');
  }),

  init() {
    this._super(...arguments);
    set(this, 'selectOptions', [ 'random', 'custom' ]);
    set(this, 'groups', [4]);
    set(this, 'strongBeats', [1]);
    set(this, 'audioContext', new AudioContext());
    set(this, 'chord', get(this, 'allChords').findBy('id', 'B'));
    // this.updateChord();
  },

  willDestroy() {
    // console.log('willDestroy');
    this._super(...arguments);
    window.clearInterval(get(this, 'interval'));
    set(this, 'interval', null);
  },

  tick() {
    let audioContext = get(this, 'audioContext');
    var osc = audioContext.createOscillator();
    var finalBeat = get(this, 'groups').reduce((a, b) => a + b);
    let time = get(this, 'time');
    let beat = get(this, 'beat');

    if (time !== 0 && beat >= finalBeat) { // downbeat
      set(this, 'beat', 1);
    } else {
      this.incrementProperty('beat');
    }

    // determine & set beat type: downbeat, strong beat, or weak beat
    if ((time !== 0) && (beat === 1)) {
      osc.frequency.value = get(this, 'downbeat');
      this.updateChord();
    }
    else if ((time !== 0) && (get(this, 'strongBeats').indexOf(beat) > -1)) {
      osc.frequency.value = get(this, 'strong');
    }
    else {
      osc.frequency.value = get(this, 'weak');
    }

    // audio tick
    osc.connect(audioContext.destination);
    osc.start(audioContext.currentTime);
    osc.stop(audioContext.currentTime + get(this, 'duration'));

    // console.log('tick', {
    //   groups: get(this, 'groups'),
    //   finalBeat,
    //   time,
    //   beat,
    //   strongBeats: get(this, 'strongBeats'),
    //   strongBeatIndex: get(this, 'strongBeats').indexOf(beat)
    // });
  },

  updateChord() {
    let chord;
    switch (get(this, 'mode')) {
      case 'random':
        {
          let allChords = get(this, 'allChords');
          let oldChord = get(this, 'chord');
          chord = oldChord;
          while (chord === oldChord) {
            chord = allChords.objectAt(randomIntInclusive(0, allChords.length - 1));
          }
          break;
        }
      default:
        chord = get(this, 'allChords').findBy('id', 'G');
        break;
    }
    set(this, 'chord', chord);
  },


  actions: {
    start() {
      run(() => {
        // console.log('start');

        // Reset our properties based on input
        set(this, 'beat', 1);
        let tempo = get(this, 'tempo');
        set(this, '_tempo', tempo);
        let beatsPerMeasure = parseInt(get(this, 'beatsPerMeasure'));
        set(this, 'time', beatsPerMeasure);
        get(this, 'groups')
          .clear()
          .pushObject(beatsPerMeasure);

        // setup audioContext
        let audioContext = get(this, 'audioContext');
        var osc = audioContext.createOscillator();
        osc.connect(audioContext.destination);
        osc.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime);

        // Stop any existing & start ours
        if (get(this, 'interval') !== null) {
          window.clearInterval(get(this, 'interval'));
        }
        set(this, 'interval', window.setInterval(this.tick.bind(this), (60 / tempo) * 1000));
      });
    },
    stop() {
      run(() => {
        // console.log('stop');
        window.clearInterval(get(this, 'interval'));
        set(this, 'interval', null);
      })
    }
  }
});
