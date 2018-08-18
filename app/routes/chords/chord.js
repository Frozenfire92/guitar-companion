import Route from '@ember/routing/route';
import { set } from '@ember/object';

export default Route.extend({
  model({ chord_id }){
    return this.store.peekRecord('chord', chord_id);
  },
  afterModel(model){
    set(this, 'breadCrumb', {
      label: model.id
    });
  }
});
