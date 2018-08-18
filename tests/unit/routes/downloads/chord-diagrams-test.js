import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | downloads/chord-diagrams', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:downloads/chord-diagrams');
    assert.ok(route);
  });
});
