import Component from '@ember/component';
import { get, set, observer } from '@ember/object';

export default Component.extend({
  tagName: 'select',
  headerOption: '--',

  didInsertElement() {
    this._super(...arguments);
    let value = get(this, 'value');
    let element = get(this, 'element');

    var opts = element.options;

    if (value && element.value !== value) {
      for (var j = 0; j < opts.length; j++) {
        if (opts[j].value === value) {
          element.selectedIndex = j;
          break;
        }
      }
    }

    if (!value && element.value !== get(this, 'headerOption')) {
      set(this, 'value', element.value);
    }
  },

  change() {
    let old = get(this, 'value');
    let nu = get(this, 'element.value');
    if (old !== nu) {
      set(this, 'value', nu);
    }
  },

  // If the value changes externally, we want to update this select box
  valueWatcher: observer('value', function () {
    let nu = get(this, 'value');
    let element = get(this, 'element');
    let old = element.value;
    if (old !== nu) {
      var opts = element.options;
      for (var j = 0; j < opts.length; j++) {
        if (opts[j].value === nu) {
          element.selectedIndex = j;
          break;
        }
      }
    }
  }),
});
