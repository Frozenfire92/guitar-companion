import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';
import defaultSettings from 'guitar-companion/utils/default-settings';

export default Route.extend({
  storage: service(),

  // Update empty localStorage to defaults
  resetEmptySettings() {
    Object.keys(defaultSettings).forEach((key) => {
      if (get(this, `storage.${key}`) === undefined) {
        set(this, `storage.${key}`, defaultSettings[key]);
      }
    });
  },

  beforeModel() {
    this.resetEmptySettings();
  },

  model() {
    return [
      this.store.createRecord('chord', {
        id: 'A',
        placements: ['x', 0, 2, 2, 2, 0],
        fingerings: [0, 0, 2, 3, 4, 0]
      }),
      this.store.createRecord('chord', {
        id: 'B',
        placements: ['x', 0, 4, 4, 4, 0],
        fingerings: [0, 1, 2, 3, 4, 1],
        bar: {
          start: 1,
          end: 5,
          fret: 2
        }
      }),
      this.store.createRecord('chord', {
        id: 'C',
        placements: ['x', 3, 2, 0, 1, 0],
        fingerings: [0, 3, 2, 0, 1, 0]
      }),
      this.store.createRecord('chord', {
        id: 'D',
        placements: ['x', 'x', 0, 2, 3, 2],
        fingerings: [0, 0, 0, 1, 3, 2]
      }),
      this.store.createRecord('chord', {
        id: 'E',
        placements: [0, 2, 2, 1, 0, 0],
        fingerings: [0, 2, 3, 1, 0, 0]
      }),
      this.store.createRecord('chord', {
        id: 'F',
        placements: [0, 3, 3, 2, 0, 0],
        fingerings: [1, 3, 4, 2, 1, 1],
        bar: {
          start: 0,
          end: 5,
          fret: 1
        }
      }),
      this.store.createRecord('chord', {
        id: 'G',
        placements: [3, 2, 0, 0, 3, 3],
        fingerings: [2, 1, 0, 0, 3, 4]
      }),

      // this.store.createRecord('chord', {
      //   id: 'a',
      //   placements: ['x', 0, 4, 4, 4, 0],
      //   fingerings: [0, 1, 2, 3, 4, 1],
      //   bar: {
      //     start: 0,
      //     end: 5,
      //     fret: 4
      //   }
      // }),
      // this.store.createRecord('chord', {
      //   id: 'a3',
      //   placements: ['x', 0, 4, 4, 4, 0],
      //   fingerings: [0, 1, 2, 3, 4, 1],
      //   bar: {
      //     start: 0,
      //     end: 5,
      //     fret: 3
      //   }
      // }),
      // this.store.createRecord('chord', {
      //   id: 'b',
      //   placements: ['x', 0, 4, 4, 4, 0],
      //   fingerings: [0, 1, 2, 3, 4, 1],
      //   bar: {
      //     start: 1,
      //     end: 5,
      //     fret: 5
      //   }
      // }),
      // this.store.createRecord('chord', {
      //   id: 'c',
      //   placements: ['x', 0, 4, 4, 4, 0],
      //   fingerings: [0, 1, 2, 3, 4, 1],
      //   bar: {
      //     start: 2,
      //     end: 5,
      //     fret: 6
      //   }
      // }),
      // this.store.createRecord('chord', {
      //   id: 'd',
      //   placements: ['x', 0, 4, 4, 4, 0],
      //   fingerings: [0, 1, 2, 3, 4, 1],
      //   bar: {
      //     start: 3,
      //     end: 5,
      //     fret: 7
      //   }
      // }),
      // this.store.createRecord('chord', {
      //   id: 'e',
      //   placements: ['x', 0, 4, 4, 4, 0],
      //   fingerings: [0, 1, 2, 3, 4, 1],
      //   bar: {
      //     start: 4,
      //     end: 5,
      //     fret: 8
      //   }
      // }),
      // this.store.createRecord('chord', {
      //   id: 'aa',
      //   placements: ['x', 0, 4, 4, 4, 0],
      //   fingerings: [0, 1, 2, 3, 4, 1],
      //   bar: {
      //     start: 0,
      //     end: 4,
      //     fret: 9
      //   }
      // }),
      // this.store.createRecord('chord', {
      //   id: 'bb',
      //   placements: ['x', 0, 4, 4, 4, 0],
      //   fingerings: [0, 1, 2, 3, 4, 1],
      //   bar: {
      //     start: 1,
      //     end: 4,
      //     fret: 10
      //   }
      // }),
      // this.store.createRecord('chord', {
      //   id: 'cc',
      //   placements: ['x', 0, 4, 4, 4, 0],
      //   fingerings: [0, 1, 2, 3, 4, 1],
      //   bar: {
      //     start: 2,
      //     end: 4,
      //     fret: 11
      //   }
      // }),
      // this.store.createRecord('chord', {
      //   id: 'dd',
      //   placements: ['x', 0, 4, 4, 4, 0],
      //   fingerings: [0, 1, 2, 3, 4, 1],
      //   bar: {
      //     start: 3,
      //     end: 4,
      //     fret: 12
      //   }
      // }),
    ];
  },

  actions: {
    resetSettings() {
      get(this, 'storage').clear();
      this.resetEmptySettings();
    }
  }
});
