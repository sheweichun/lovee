'use strict';
import './styles/index.css';
import './index.less';
import template from './template';

function writeIframe(frameDocument, option) {
  frameDocument.open();
  frameDocument.designMode = 'on';
  frameDocument.write(template(option));
  frameDocument.designMode = 'off';
  frameDocument.close();
}

window.onload = function() {
  let myframe = document.getElementById('myframe');
  let frameDocument = myframe.contentWindow.document;
  writeIframe(frameDocument, {
    render: 'LoveeCanvas',
    prefix: window.PREFIX || '/'
  });
  let $select = document.querySelector('select');
  $select.addEventListener('change', (e, value) => {
    writeIframe(frameDocument, {
      render: $select.options[$select.selectedIndex].value,
      prefix: window.PREFIX || '/'
    });
  });



  // frameDocument.innerHTML = template;
  // Lovee('.origin', LoveeCanvas, {
  //   // reverse: true
  //   target: '.orginBg'
  // });
  // Lovee('.hover', LoveeCanvas, {
  //   // reverse: true
  //   target: '.bg'
  // });
  // Lovee('.origin', LoveeSvg, {
  //   // reverse: true
  //   target: '.orginBg'
  // });
  // Lovee('.hover', LoveeSvg, {
  //   // reverse: true
  //   target: '.bg'
  // });
  // Lovee('.origin', LoveeImage, {
  //   // reverse: true
  //   target: '.orginBg'
  // });
  // Lovee('.hover', LoveeImage, {
  //   // reverse: true
  //   target: '.bg'
  // });
};
