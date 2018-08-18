import Service from '@ember/service';
import { get, set } from '@ember/object';
import { or } from '@ember/object/computed';
import { bind } from '@ember/runloop';

export default Service.extend({

  isMobile: true,
  isTablet: false,
  isDesktop: false,
  isLargeDesktop: false,

  isSmall: or('isMobile', 'isTablet'),
  isLarge: or('isDesktop', 'isLargeDesktop'),

  mobileQuery: '(max-width: 767px)',
  tabletQuery: '(min-width: 768px) and (max-width: 1023px)',
  desktopQuery: '(min-width: 1024px) and (max-width: 1400px)',
  largeDesktopQuery: '(min-width: 1401px)',

  init () {
    this._super(...arguments);
    let mqls = set(this, 'mqls', []);
    ['mobileQuery', 'tabletQuery', 'desktopQuery', 'largeDesktopQuery'].forEach((queryKey) => {
      let query = get(this, queryKey);
      let mediaQueryList = window.matchMedia(query);
      let propertyKey = `is${queryKey.replace('Query', '').capitalize()}`;
      let listener = bind(this, (mql) => {
        set(this, propertyKey, mql.matches);
      });
      mediaQueryList.addListener(listener);
      mqls.pushObject({
        propertyKey,
        mediaQueryList,
        listener
      });
    });
    // set initial values
    mqls.forEach((mql)=>{
      set(this, mql.propertyKey, mql.mediaQueryList.matches);
    });
  },

  willDestroy() {
    get(this, 'mqls').forEach((mql) => {
      mql.mediaQueryList.removeListener(mql.listener)
    });
    this._super(...arguments);
  }
});
