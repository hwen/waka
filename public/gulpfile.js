var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

gulp.task('lessminicss', function() {
    gulp.src('src/app/**/*.less')
        .pipe($.concat('app.less'))
        .pipe($.less())
        .pipe($.minifyCss())
        .pipe(gulp.dest('src/dist/'));
});

gulp.task('jshint', function() {
   return gulp.src('src/app/**/*.js')
       .pipe($.jshint())
       .pipe($.jshint.reporter('default'));
});

gulp.task('minifyjs', function() {
    return gulp.src('src/app/**/*.js')
        .pipe($.concat('app.js'))
        .pipe(gulp.dest('src/dist/'))
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe($.uglify())
        .pipe(gulp.dest('src/dist/'));
});

gulp.task('watchless', function() {
    gulp.watch(['src/app/**/*.less'], ['less']);
});

gulp.task('inject', function() {
    var injectJS = gulp.src('src/app/**/*.js', {read:false});
    return gulp.src('src/index.html')
        .pipe($.inject(injectJS, {relative: true}))
        .pipe(gulp.dest('src/'));
});

gulp.task('default', ['jshint', 'lessminicss', 'inject'], function() {
    gulp.start('minifyjs');
});

