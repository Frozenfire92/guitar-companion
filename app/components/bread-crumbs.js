import Component from '@ember/component';
import { getOwner } from '@ember/application';
import { computed, get, getWithDefault } from '@ember/object';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  classNames: ['bread-crumbs'],

  currentRouteName: readOnly('applicationRoute.controller.currentRouteName'),

  crumbs: computed('currentRouteName', function(){
    return get(this, 'currentRouteName')
      .split('.')
      .filter((n) => !(n === 'index' || n === 'loading'))
      .map((routeName, index, array) => {

        let routePath = routeName;
        if (index > 0) {
          routePath = array.slice(0, index + 1).join('.');
        }

        let route = getOwner(this).lookup(`route:${routePath}`);

        return {
          link: routePath,
          label: getWithDefault(route, 'breadCrumb.label', routeName.capitalize())
        };
      });
  })
});
