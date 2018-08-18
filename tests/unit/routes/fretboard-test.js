import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | fretboard', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:fretboard');
    assert.ok(route);
  });
});
