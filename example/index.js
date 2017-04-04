'use strict';
import './index.less';
import Gscene from '../src/index';




window.addEventListener('load', () => {
  new Gscene({
    debug: true
  }).parse()
  .run();
  // .load((gscene) => {
  //   gscene && gscene.run();
  // });
});

