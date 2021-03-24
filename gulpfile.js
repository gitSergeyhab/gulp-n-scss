const {src, dest, series, watch} = require('gulp');
const sync = require('browser-sync').create();

const sourcemap = require('gulp-sourcemaps');
const scss = require('gulp-sass');
const concat = require('gulp-concat');
const gprefix = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const rename = require('gulp-rename');

// const postcss = require('gulp-postcss');
// const prefix = require('autoprefixer');

const fileInclude = require('gulp-file-include');

// const indexHtml = () => {
//   return src('source/html/index0.html')
//     .pipe(fileInclude({
//       prefix: '@@',
//       basepath: '@file'
//     }))
//     .pipe(rename('index.html'))
//     .pipe(dest('build'))
//     .pipe(sync.stream())
// }

function htmlProrto (start, end) {
  return src(`source/html/${start}.html`)
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(rename(`${end}.html`))
    .pipe(dest('build'))
    .pipe(sync.stream())

}

const indexHtml = () => htmlProrto('index0', 'index');



const scssFiles = [
  'source/scss/header.scss',
  'source/scss/main.scss',
  'source/scss/footer.scss'
]

const styles = () => {
  // return src('source/scss/**/*.scss')
  return src(scssFiles)
    .pipe(sourcemap.init())
    .pipe(scss({ outputStyle: 'expanded' }))
    .pipe(concat('styles.min.css'))
    // .pipe(postcss([prefix({ cascade: false })]))
    .pipe(gprefix({ cascade: false, overrideBrowserslist: ['last 5 versions'] }))
    // .pipe(csso())
    .pipe(sourcemap.write('.'))
    .pipe(dest('build/css'))
    .pipe(sync.stream())
}

// const server = sync.create();

// const serve = (done) => {
//   server.init({
//     server: {
//       baseDir: 'build'
//     },
//     cors: true,
//     notify: false,
//     ui: false,
//   });
//   done();
// }

// const watcher = () => {
//   watch('source/scss/**/*.scss', styles);
//   watch('source/html/**/*.html', indexHtml);
// }

const watcher = () => {
  sync.init({
      server: {
          baseDir: 'build'
      }
  });

  watch('source/scss/**/*.scss', styles);
  watch('source/html/**/*.html', indexHtml);
}


exports.styles = styles;
exports.indexHtml = indexHtml;

exports.default = series(indexHtml, styles, watcher)
