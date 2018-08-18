import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('chords', function() {
    this.route('chord', { path: '/:chord_id' });
  });
  this.route('settings');
  this.route('fretboard');
  this.route('downloads', function() {
    this.route('chord-diagrams');
    this.route('freboards');
    this.route('sheet-music');
    this.route('tab-diagrams');
  });
  this.route('practice');
});

export default Router;
