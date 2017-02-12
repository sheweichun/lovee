// const defaultOriginOpt = {
//   target: '.orginBg'
// };
//
// const defaultHoverOpt = {
//   target: '.orginBg'
// };
const merge = Object.assign;

function obj2Str(obj) {
  return Object.keys(obj).map((key) => {
    return `${key}:${obj[key]},`;
  });
}

function generate(option) {
  let render = option.render;
  let opt = option.option || {};
  let originOpt = merge({}, opt, {
    target: '.orginBg'
  });
  let hoverOpt = merge({}, opt, {
    target: '.bg'
  });
  return `Lovee('.origin', ${render}, ${JSON.stringify(originOpt)});
  Lovee('.hover', ${render}, ${JSON.stringify(hoverOpt)});`;
}

module.exports = (option) => {
  const {prefix} = option;
  return `<!doctype html>
  <html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>lovee</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link href="${prefix}example/styles/index.css" rel="stylesheet">
  </head>
  <style>
  body{
    font-family: system, -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Lucida Grande", sans-serif;
    line-height: 1.65;
    -webkit-font-smoothing: antialiased;
    background: #fff;
    color: #34495e;
  }
  @media screen and (max-width: 500px) {
    .gradient-wrap img{
      width: 100%;
      height: auto;
    }
    .p4{
      padding: 2rem;
    }
  } 
  </style>
  <body>
    <div class="container center p2 pt4">
      <div class="gradient-wrap origin p4 mb2 mr1 inline-block" >
          <div class="orginBg">
          </div>
          <img src="${prefix}example/images/wukong.jpg"  alt="" >
      </div>
      <div class="gradient-wrap hover p4 mb2 mr1 inline-block" >
          <div class="bg">
          </div>
          <img src="${prefix}example/images/wukong.jpg"  alt="" >
      </div>
      <div class="gradient-wrap origin p4 mb2 mr1 inline-block" >
          <div class="orginBg">
          </div>
          <img src="${prefix}example/images/fulisa.jpg"  alt="" >
      </div>
      <div class="gradient-wrap hover p4 mb2 mr1 inline-block" >
          <div class="bg">

          </div>
          <img src="${prefix}example/images/fulisa.jpg"  alt="" >
      </div>
      <div class="gradient-wrap origin p4 mb2 mr1 inline-block" >
          <div class="orginBg">
          </div>
          <img src="${prefix}example/images/tree.jpg"  alt="" >
      </div>
      <div class="gradient-wrap hover p4 mb2 mr1 inline-block" >
          <div class="bg">

          </div>
          <img src="${prefix}example/images/tree.jpg"  alt="" >
      </div>
      <div class="gradient-wrap origin p4 mb2 mr1 inline-block" >
          <div class="orginBg">
          </div>
          <img src="${prefix}example/images/tree2.jpg"  alt="" >
      </div>
      <div class="gradient-wrap hover p4 mb2 mr1 inline-block" >
          <div class="bg">

          </div>
          <img src="${prefix}example/images/tree2.jpg"  alt="" >
      </div>
      <div class="gradient-wrap origin p4 mb2 mr1 inline-block" >
          <div class="orginBg">
          </div>
          <img src="${prefix}example/images/logo.jpg"  alt="" >
      </div>
      <div class="gradient-wrap hover p4 mb2 mr1 inline-block" >
          <div class="bg">

          </div>
          <img src="${prefix}example/images/logo.jpg"  alt="" >
      </div>
      <div class="gradient-wrap origin p4 mb2 mr1 inline-block" >
          <div class="orginBg">
          </div>
          <img src="${prefix}example/images/logo1.jpg" data-limit="3"   alt="" >
      </div>
      <div class="gradient-wrap hover p4 mb2 mr1 inline-block" >
          <div class="bg">

          </div>
          <img src="${prefix}example/images/logo1.jpg" data-limit="3"  alt="" >
      </div>

    </div>
  </body>
  <script src="${prefix}dist/loveeImage.js"></script>
  <script src="${prefix}dist/loveeSvg.js"></script>
  <script src="${prefix}dist/loveeCanvas.js"></script>
  <script src="${prefix}dist/lovee.js"></script>
  <script>
    ${generate(option)}
  </script>
  </html>
  `;
};
