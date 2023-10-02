"use strict";

const {src, dest} = require('gulp');
const gulp = require('gulp');

const autoprefixer = require('gulp-autoprefixer');
const cssbeautify = require('gulp-cssbeautify');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber'); //Предотвращает поломку проекта
const removeCssComments = require('gulp-remove-css-comments');
const rename = require('gulp-rename');
const rigger = require('gulp-rigger'); //Собирает js в один файл
const sass = require('gulp-sass')(require('sass'));
const stripCssComments = require('gulp-strip-css-comments');
const uglify = require('gulp-uglify'); //Mini js
const panini = require('panini');
const del = require('del');
const notify = require('gulp-notify');
const browserSync = require('browser-sync').create();
const include = require('gulp-include');
const concat = require('gulp-concat');

const srcPath = 'src/';
const distPath = 'dist/';

const path = {
  build: {
    html: distPath,
    css: distPath + 'assets/css',
    js: distPath + 'assets/js',
    images: distPath + 'assets/images',
    fonts: distPath + 'assets/fonts'
  },
  src: {
    html: srcPath + '*.html',
    css: srcPath + 'assets/scss/*.scss',
    js: srcPath + 'assets/js/*.js',
    images: srcPath + 'assets/images/**/*.*',
    fonts: srcPath + 'assets/fonts/**/*.*'
  },
  watch: {
    html: srcPath + '**/*.html',
    css: srcPath + 'assets/scss/**/*.scss',
    js: srcPath + 'assets/js/**/*.js',
    images: srcPath + 'assets/images/**/*.*',
    fonts: srcPath + 'assets/fonts/**/*.*'
  },
  clean: './' + distPath
};

function serve() {
  browserSync.init({
    server: {
      baseDir: './' + distPath
    }
  });
}

function html() {
  return src(path.src.html, {
    base: srcPath
  })
    .pipe(include({
      includePaths: 'src/includes'
    }))
    .pipe(plumber())
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream())
}

function css() {
  return src(path.src.css, {
    base: srcPath + 'assets/scss/'
  })
    .pipe(plumber({
      errorHandler: function(err) {
        notify.onError({
          title: 'SCSS error',
          message: 'Error: <%= error.message %>'
        })(err);
        this.emit('and');
      }
    }))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssbeautify())
    .pipe(concat('style.css'))
    .pipe(dest(path.build.css))
    .pipe(cssnano({
      zindex: false,
      discardComments: {
        removeAll: true
      }
    }))
    .pipe(removeCssComments())
    .pipe(rename({
      suffix: '.min',
      extname: '.css'
    }))
    .pipe(dest(path.build.css))
    .pipe(browserSync.stream())
}

function js() {
  return src(['node_modules/swiper/swiper-bundle.min.js', path.src.js], {
    base: srcPath + 'assets/js/'
  })
    .pipe(concat('main.js'))
    .pipe(plumber({
      errorHandler: function(err) {
        notify.onError({
          title: 'JS error',
          message: 'Error: <%= error.message %>'
        })(err);
        this.emit('and');
      }
    }))
    .pipe(rigger())
    .pipe(dest(path.build.js))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min',
      extname: '.js'
    }))
    .pipe(dest(path.build.js))
    .pipe(browserSync.stream())
}

function images() {
  return src(path.src.images, {
    base: srcPath + 'assets/images/'
  })
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(dest(path.build.images))
    .pipe(browserSync.stream())
}

function fonts() {
  return src(path.src.fonts, {
    base: srcPath + 'assets/fonts/'
  })
    .pipe(dest(path.build.fonts))
    .pipe(browserSync.stream())
}

function clean() {
  return del(path.clean)
}

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.images], images);
  gulp.watch([path.watch.fonts], fonts);
}

const build = gulp.series(clean, gulp.parallel(html, css, js, images, fonts));
const watch = gulp.parallel(build, watchFiles, serve);

exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.fonts = fonts;
exports.clean = clean;

exports.build = build;
exports.watch = watch;

exports.default = watch;