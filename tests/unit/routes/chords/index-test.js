import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | chords/index', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:chords/index');
    assert.ok(route);
  });
});
