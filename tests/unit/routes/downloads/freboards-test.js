import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | downloads/freboards', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:downloads/freboards');
    assert.ok(route);
  });
});
