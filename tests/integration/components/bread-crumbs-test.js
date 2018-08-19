import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { set } from '@ember/object';
import hbs from 'htmlbars-inline-precompile';
import Route from '@ember/routing/route';

module('Integration | Component | bread-crumbs', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    set(this, 'applicationRoute', {
      controller: {
        currentRouteName: 'one.two'
      }
    });

    let routeOneStub = Route.extend({
      init(){
        this._super(...arguments);
        set(this, 'breadCrumb', {
          label: 'One'
        });
      }
    });

    let routeTwoStub = Route.extend({});

    this.owner.register('route:one', routeOneStub);
    this.owner.register('route:one.two', routeTwoStub);
    await render(hbs`{{bread-crumbs applicationRoute=applicationRoute}}`);

    assert.equal(this.element.textContent.trim().replace(/\s+/g, ' '), 'One > Two');
  });
});
