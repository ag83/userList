var gulp        = require('gulp'),
    $ = require('gulp-load-plugins')(); 

gulp.task('js', function() {
  return gulp.src('assets/js/*.js')
    .pipe($.browserify({debug: true})) 
    .pipe($.uglify()) 
    .pipe(gulp.dest('public/scripts/')) 
    .pipe($.connect.reload()); 
});

gulp.task('css', function() {
  return gulp.src('assets/style/*.styl')
    .pipe($.styl( { whitespace: true } )) 
    .pipe($.csso()) 
    .pipe(gulp.dest('public/style/')) 
    .pipe($.connect.reload()); 
});

 
gulp.task('jade', function() {
  return gulp.src('assets/template/*.jade')
    .pipe($.jade({pretty: true}))
    .pipe(gulp.dest('public/'))
    .pipe($.connect.reload()); 
});
 

gulp.task('watch', ['css', 'js', 'jade'], function() {

  gulp.watch('assets/template/*.jade', ['jade']);
  gulp.watch('assets/style/*.styl', ['css']);
  gulp.watch('assets/js/*.js', ['js']);
});

gulp.task('server', ['watch'], function() {
  $.connect.server({
    root: 'public', 
    port: 9000, 
    livereload: true 
  })
});