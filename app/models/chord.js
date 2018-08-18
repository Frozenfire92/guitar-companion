import DS from 'ember-data';
import { computed, get } from "@ember/object";

const {
  attr,
  Model
} = DS;

export default Model.extend({
  placements: attr({ defaultValue(){ return []; } }),
  fingerings: attr({ defaultValue(){ return []; } }),
  bar: attr(),

  adjustedPlacements: computed('placements', 'bar', function(){
    let bar = get(this, 'bar');
    let placements = get(this, 'placements');
    let fretMinusOne = bar ? bar.fret - 1 : 0;
    return bar
      ? bar.fret > 1
        ? placements.map(n => n > 0 ? (n - fretMinusOne) : n)
        : placements
      : placements;
  })
});
