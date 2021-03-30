const {src, dest, series, watch} = require('gulp');
const sync = require('browser-sync').create();
const del = require('del');

const sourcemap = require('gulp-sourcemaps');
const scss = require('gulp-sass');
const concat = require('gulp-concat');
const gprefix = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const rename = require('gulp-rename');

// const postcss = require('gulp-postcss');
// const prefix = require('autoprefixer');

const fileInclude = require('gulp-file-include');

const imagemin = require('gulp-imagemin');
const svgstore = require('gulp-svgstore');
const svgSprite = require('gulp-svg-sprite')
const webp = require('gulp-webp');

function htmlProto (file) {
  return src(`source/html/${file}.html`)
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(dest('build'))
    .pipe(sync.stream())
}

const indexHtml = () => htmlProto('index');
const formHtml = () => htmlProto('form');
const catalogHtml = () => htmlProto('catalog');



const scssFiles = [
  'source/scss/header.scss',
  'source/scss/main.scss',
  'source/scss/footer.scss'
]

const styles = () => {
  return src('source/scss/style.scss')
  // return src(scssFiles)
    .pipe(sourcemap.init())
    .pipe(scss({ outputStyle: 'expanded' }))
    // .pipe(concat('styles.min.css'))
    // .pipe(postcss([prefix({ cascade: false })]))
    .pipe(gprefix({ cascade: false, overrideBrowserslist: ['last 5 versions'] }))
    // .pipe(csso())
    .pipe(sourcemap.write('.'))
    .pipe(dest('build/css'))
    .pipe(sync.stream())
}

const scriptList = ['source/js/example1.js', 'source/js/example2.js']
const scripts = () => {
  // return src('source/js/**/*.js')
  return src(scriptList)
    .pipe(concat('script.js'))
    .pipe(dest('build/js'))
}

const sprite = () => {
  return src('source/img/**/*.svg')
    .pipe(imagemin([imagemin.svgo({
      plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
      ]
    })]))
    .pipe(svgstore())
    .pipe(rename('sprite.svg'))
    .pipe(dest('build/img'))
}

const images = () => {
  return src('source/img/**/*.{svg,jpg,png}')
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 4 }),
      imagemin.mozjpeg({ quality: 75, progressive: true }),
      imagemin.svgo({
        plugins: [
            {removeViewBox: true},
            {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(dest('build/img'))
}

const webper = () => {
  return src('source/img/**/*.{jpg,png}')
    .pipe(webp())
    .pipe(dest('build/img'))
}

const directoryList = ['source/fonts/**/*']

const copy = () => {
  return src(directoryList)
    .pipe(dest('build'))
}

const clean = () => {
  return del('build');
}

const watcher = () => {
  sync.init({
      server: {
          baseDir: 'build'
      }
  });

  watch('source/scss/**/*.scss', styles);
  watch('source/html/**/*.html', indexHtml);
  watch('source/html/**/*.html', formHtml);
  watch('source/html/**/*.html', catalogHtml);
  watch('source/js/**/*.js', scripts)
  watch('source/img/**/*.svg', sprite);
  watch('source/img/**/*.{jpg,png}', images);
  watch('source/img/**/*.{jpg,png}', webper);
}


exports.styles = styles;
exports.indexHtml = indexHtml;
exports.formHtml = formHtml;
exports.catalogHtml = catalogHtml;
exports.scripts = scripts;
exports.sprite = sprite;
exports.images = images;
exports.webper = webper;
exports.copy = copy;
exports.clean = clean;


exports.default = series(clean, indexHtml, formHtml, catalogHtml, sprite, images, webper, copy, styles, scripts, watcher)
