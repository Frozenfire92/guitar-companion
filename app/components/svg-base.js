import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
  tagName: 'svg',
  attributeBindings: ['viewBox', 'xmlns'],
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: '0 0 100 100',
  htmlString: alias('element.outerHTML')
});
