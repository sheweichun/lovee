
require('babel-core/register');
var gulp = require('gulp');
var babel = require('gulp-babel');
var gulpSequence = require('gulp-sequence');
var del = require('del');
var minimist = require('minimist');
var mocha = require('gulp-mocha');
var plumber = require('gulp-plumber');
var path = require('path');
const DIR = {
  src: './src/**/*.js',
  test: './test',
  testes6: './test_es6',
  build: '../../build',
  dist: 'lib',
  // styles: './styles'
  css: './src/**/*.css',
  less: './src/**/*.less',
  scss: './src/**/*.scss'
};


var babelConfig = {
  // plugins: [
  //   [
  //     '@ali/babel-plugin-style-remove'
  //   ]
  // ]
};

function upper(name) {
  var index = name.lastIndexOf('\/');
  if (index > -1) {
    name = name.substring(index + 1);
  }
  var arr = name.split('-');
  return arr.map(function(word) {
    return word.toLowerCase().replace(/^\S/g, function(s) {
      return s.toUpperCase();
    });
  }).join('');
}

gulp.task('clean', () => {
  return del([DIR.dist]);
});
gulp.task('babel', () => {
  return gulp.src(DIR.src)
	.pipe(plumber())
	.pipe(babel(babelConfig))
	.pipe(gulp.dest(DIR.dist));
});
gulp.task('babelTest', () => {
  return gulp.src(DIR.testes6 + '/**/*.spec.js')
	.pipe(plumber())
	.pipe(babel(babelConfig))
	.pipe(gulp.dest(DIR.test));
});

// gulp.task('copycss', () => {
//   var curName = upper(path.resolve(__dirname));
//   var buildPath = path.resolve(__dirname, '../../build');
//   return gulp.src([
//     `${buildPath}/${curName}.css`,
//     `${buildPath}/${curName}.next.css`
//   ]).pipe(gulp.dest(DIR.styles));
// });
gulp.task('copycss', () => {
  return gulp.src([
    DIR.css,
    DIR.less,
    DIR.scss
  ])
  .pipe(gulp.dest(DIR.dist));
});

gulp.task('build', (cb) => {
  process.env.NODE_ENV = 'production';
  return gulpSequence(
		'clean',
    ['copycss'],
		['babel', 'babelTest']
	)(cb);
});

gulp.task('watch', (cb) => {
  process.env.NODE_ENV = 'production';
  gulp.watch([DIR.src, DIR.css, DIR.less, DIR.scss], ['babel', 'copycss']);
});

gulp.task('test', (cb) => {
  var options = minimist(process.argv);
  var file = options.file;
  gulp.src(`${DIR.testes6}/${file}.spec.js`)
        .pipe(mocha())
        .once('error', (err) => {
        	console.log('err :', err);
          process.exit(1);
        })
        .once('end', () => {
        	console.log('test over');
          process.exit();
        });
});



gulp.task('testAll', (cb) => {
  gulp.src([`${DIR.testes6}/**/*.spec.js`])
		.pipe(babel())
        .pipe(mocha())
        .once('error', (err) => {
        	console.log('err :', err);
          process.exit(1);
        })
        .once('end', () => {
        	console.log('test over');
          process.exit();
        });
});
