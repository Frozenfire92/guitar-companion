import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | downloads/sheet-music', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:downloads/sheet-music');
    assert.ok(route);
  });
});
