import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, set } from '@ember/object';



export default Component.extend({
  classNames: ['settings-preview'],

  store: service(),
  storage: service(),

  init() {
    this._super(...arguments);

    set(this, 'chord', get(this, 'store').peekRecord('chord', 'B'));
  },

  actions: {
    reset() {
      let clearSettings = confirm('Clear your settings - This cannot be undone');
      if (clearSettings) {
        get(this, 'resetAction')();
      }
    }
  }
});
