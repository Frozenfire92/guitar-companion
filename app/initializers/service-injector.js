export function initialize(application) {
  application.inject('controller', 'screen', 'service:screen');
}

export default {
  initialize
};
