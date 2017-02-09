var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var showFlag = false;
var stream = process.stderr;
var isProd = process.env.NODE_ENV === 'production';
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var publicPath = isProd ? './' : '/';
var plugins;
var dirName = 'example', libName, libTarget, entry;
if (isProd) {
  dirName = 'src';
  libName = '[name]';
  libTarget = 'umd';
  entry = {
    Lovee: ['./' + dirName + '/index'],
    LoveeCanvas: ['./src/render/canvas'],
    LoveeImage: ['./src/render/image'],
    LoveeSvg: ['./src/render/svg']

  };
  plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.NoErrorsPlugin(),
    new webpack.ProgressPlugin(function handler(percentage, msg) {
      if (showFlag) {
        stream.moveCursor(0, 0);
        stream.clearLine();
        stream.cursorTo(0);
      }
      showFlag = true;
      stream.write('当前打包进度 :' + parseInt((percentage * 100).toFixed(2)) + '%,' + msg);
    })
    // ,new webpack.optimize.UglifyJsPlugin({
		// 	  compress: {
		// 	    unused: true,
		// 	    dead_code: true,
		// 	    warnings: false
		// 	  },
		// 	  mangle: {
		// 	    except: ['$', 'exports', 'require']
		// 	  },
		// 	  output: {
		// 	    ascii_only: true
		// 	  }
    // })
    // ,new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'example/index.html',
    //   inject: 'body'
    // })
  ];
  if (process.env.WEBPACK_BUNDLE) {
    plugins.push(new BundleAnalyzerPlugin({}));
  }
} else {
  entry = {
    app: ['./' + dirName + '/index']
  };
  plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.SourceMapDevToolPlugin({}),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'example/index.html',
      inject: 'body'
    })
  ];
}

module.exports = {
  // click on the name of the option to get to the detailed documentation
  // click on the items with arrows to show more examples / advanced options

  entry: entry, // string | object | array
  // Here the application starts executing
  // and webpack starts bundling

  output: {
    // options related how webpack emits results

    path: path.resolve(__dirname, 'dist'), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)

    filename: '[name].js', // string
    // the filename template for entry chunks

    publicPath: publicPath, // string
    // the url to the output directory resolved relative to the HTML page

    library: libName, // string,
    // the name of the exported library

    libraryTarget: libTarget, // enum
    // the type of the exported library

    /* Advanced output configuration (click to show) */
  },

  module: {
    // configuration regarding modules

    rules: [
      // rules for modules (configure loaders, parser options, etc.)

      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname)
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],

        // apply these rule even if rules are overridden (advanced option)

        loader: 'babel-loader',
        // the loader which should be applied, it'll be resolve relative to the context
        // -loader suffix is no longer optional in Webpack 2 for clarity reasons
        // see webpack 1 upgrade guide

        options: {
          presets: ['es2015']
        },
        // options for the loader
      },
      {
    	    test: /\.less$/,
    	    loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
    	},
      {
    		test: /\.css$/,
    		loader: 'style-loader!css-loader'
    	}
      // matches if the condition is not matched
    ],

    /* Advanced module configuration (click to show) */
  },

  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)

    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ],
    // directories where to look for modules

    extensions: ['.js', '.json', '.jsx'],
    // extensions that are used

    alias: {
      // a list of module name aliases

      // alias "only-module" -> "new-module", but not "module/path/file" -> "new-module/path/file"
    },
    /* alternative alias syntax (click to show) */

    /* Advanced resolve configuration (click to show) */
  },

  devtool: 'source-map', // enum
  // enhance debugging by adding meta info for the browser devtools
  // source-map most detailed at the expense of build speed.

  context: __dirname, // string (absolute path!)
  // the home directory for webpack
  // the entry and module.rules.loader option
  //   is resolved relative to this directory

  target: 'web', // enum
  // the environment in which the bundle should run
  // changes chunk loading behavior and available modules

  // Don't follow/bundle these modules, but request them at runtime from the environment

  stats: {
    /* TODO */
  },

  devServer: {
    contentBase: path.join(__dirname, './'),
    compress: true,
    publicPath: publicPath,
    port: 9000
  },

  plugins: plugins
  // list of additional plugins

  /* Advanced configuration (click to show) */
};
