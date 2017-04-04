'use strict';



let startTime, debug;
export default {
  init(flag) {
    debug = flag;
  },
  start() {
    debug && (startTime = Date.now());
  },
  end(msg = '') {
    debug && console.log(`【${msg}】used time: ${(Date.now() - startTime) / 1000}s`);
  }
};