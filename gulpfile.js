var gulp        = require('gulp');
var sass        = require('gulp-sass');
var babel       = require('gulp-babel');
var ngAnnotate  = require('gulp-ng-annotate');
var gulpBrowser = require("gulp-browser");
var uglify      = require('gulp-uglify');

gulp.task('default', ['html', 'pageviews', 'css', 'js', 'images']);

gulp.task('html', function() {
   return gulp.src('./*.html')
      .pipe(gulp.dest('./public/'));
});

gulp.task('pageviews', function() {
   return gulp.src('./pageviews/*.html')
      .pipe(gulp.dest('./public/pageviews'));
});

gulp.task('css', function() {
   return gulp.src('./scss/main.scss')
      .pipe(sass())
      .pipe(gulp.dest('./public/css'));
});

gulp.task('js', function() {
   return gulp.src('./js/*.js')
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(ngAnnotate())
      .pipe(gulpBrowser.browserify())
      //.pipe(uglify())
      .pipe(gulp.dest('./public/js/'));
});

gulp.task('images', function() {
   return gulp.src('./imges/*')
    .pipe(gulp.dest('./public/images/'));
});

gulp.task('watch', function() {
   gulp.watch('./*html', ['html']);
   gulp.watch('./scss/*.scss', ['css']);
   gulp.watch('./js/*.js', ['js']);
});
