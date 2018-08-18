import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | downloads/tab-diagrams', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:downloads/tab-diagrams');
    assert.ok(route);
  });
});
