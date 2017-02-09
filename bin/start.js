var config = require("../webpack.config.js");
var webpack = require("webpack")
var open = require("open");
var  WebpackDevServer = require("webpack-dev-server")
var url = "http://localhost:"+config.devServer.port+"/";
for(var attr in config.entry){
  config.entry[attr].unshift("webpack-dev-server/client?"+url);
}

var compiler = webpack(config);
var server = new WebpackDevServer(compiler,config.devServer);
server.listen(config.devServer.port,function(){
  console.log("=====>server from "+url)
  open(url)
});
