var gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    stylus = require('gulp-stylus'),
    csso = require('gulp-csso'),
    jade = require('gulp-jade'),
    htmlmin = require('gulp-htmlmin'),
    myth = require('gulp-myth'),
    concat  = require('gulp-concat'),

    jsLibs = [
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js'
        ],
    cssLibs = [
        'bower_components/bootstrap/dist/css/bootstrap.css'
        ]

gulp.task('js', function() {
  return gulp.src('assets/js/*.js')
    .pipe(browserify({debug: true}))
    .pipe(gulp.dest('public/scripts/')) 
    .pipe(connect.reload()); 
});

gulp.task('css', function() {
  return gulp.src('assets/css/*.styl')
    .pipe(stylus())
    .on('error', console.log)
    .pipe(myth())
    .pipe(gulp.dest('public/css/')) 
    .pipe(connect.reload()); 
});

 
gulp.task('jade', function() {
  return gulp.src('assets/template/*.jade')
    .pipe(jade({pretty: true}))
    .on('error', console.log)
    .pipe(gulp.dest('public/'))
    .pipe(connect.reload()); 
});

gulp.task('libs.js', function () {
    return gulp.src(jsLibs)
    .pipe(concat('libs.js'))
    .pipe(gulp.dest('public/scripts/'))
});

gulp.task('libs.css', function () {
    return gulp.src(cssLibs)
    .pipe(concat('libs.css'))
    .pipe(gulp.dest('public/css/'))
});
 

gulp.task('watch', ['css', 'js', 'jade', 'libs.js', 'libs.css'], function() {

  gulp.watch('assets/template/*.jade', ['jade']);
  gulp.watch('assets/css/*.styl', ['css']);
  gulp.watch('assets/js/*.js', ['js']);
  gulp.watch('bower.json', ['libs.js', 'libs.css']);
});

gulp.task('server', ['watch'], function() {
  connect.server({
    root: 'public', 
    port: 9000, 
    livereload: true 
  })
});

gulp.task('build', function() {
    gulp.src('assets/css/*.styl')
        .pipe(stylus()) 
        .pipe(myth()) 
        .pipe(csso()) 
        .pipe(gulp.dest('./build/css/')) 

    gulp.src('assets/template/*.jade')
        .pipe(jade())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./build/'))


    gulp.src('assets/js/*.js')
        .pipe(browserify({debug: true}))
        .pipe(uglify())
        .pipe(gulp.dest('./build/js'));

    gulp.src(jsLibs)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('./build/js'))

    gulp.src(cssLibs)
        .pipe(concat('libs.css'))
        .pipe(gulp.dest('./build/css'))
});
