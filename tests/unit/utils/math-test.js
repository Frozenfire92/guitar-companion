
import { randomIntInclusive } from 'guitar-companion/utils/math';
import { module, test } from 'qunit';

module('Unit | Utility | math', function(/* hooks */) {

  // Replace this with your real tests.
  test('it works', function(assert) {
    let result = randomIntInclusive(0, 10);
    assert.ok(result >= 0 && result <= 10);
  });
});
