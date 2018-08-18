export function initialize(application) {
  application.inject('component:bread-crumbs', 'applicationRoute', 'route:application');
}

export default {
  initialize
};
