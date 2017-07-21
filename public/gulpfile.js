var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

/*
* 前端测试用服务器
* */
gulp.task('webserver', function() {
    $.connect.server({
        port: 2333,
        root: 'src',
        livereload: true
    });
});

gulp.task('html', function() {
    gulp.src('src/app/**/*.html')
        .pipe($.connect.reload());

});

gulp.task('css', function() {
    gulp.src('dist/*.css')
        .pipe($.connect.reload());
});

gulp.task('js', function() {
    gulp.src('src/app/**/*.js')
        .pipe($.connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(['src/app/**/*.less'], ['lessminicss']);
    gulp.watch(['dist/*.css'], ['css']);
    gulp.watch(['src/app/**/*.js'], ['js']);
});

gulp.task('watchless', function() {
    gulp.watch(['src/app/**/*.less'], ['lessminicss']);
});

/*
* css，js压缩合并
* */

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

gulp.task('inject', function() {
    var injectJS = gulp.src('src/app/**/*.js', {read:false});
    return gulp.src('src/index.html')
        .pipe($.inject(injectJS, {relative: true}))
        .pipe(gulp.dest('src/'));
});

gulp.task('default', ['lessminicss', 'inject'], function() {
    gulp.start('minifyjs');
});

gulp.task('server', ['webserver', 'watch']);

