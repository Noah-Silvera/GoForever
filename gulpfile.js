/**
 * The build system
 * Credits to webdesserts for the auto reload node pattern
 * https://gist.github.com/webdesserts/5632955
 */

var gulp = require('gulp');
var sass = require('gulp-sass')
var livereload = require('gulp-livereload')
var clean = require('gulp-clean')
var runSequence = require('run-sequence')

var spawn = require('child_process').spawn
var node;

// the file patterns used
var patt = {
    'sass': './src/sass/**/*.scss',
    'backend':'./src/scripts/backend/**/*.js',
    'frontend':'./src/scripts/frontend/**/*.js',
    'static':'./src/static/**/*'
}



/**
 * $ gulp server
 * description: launch the server. If there's a server already running, kill it.
 */
gulp.task('reload', function() {
  if (node) node.kill()
  node = spawn('node', ['./dest/scripts/backend/server.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
  livereload()
  console.log('code refreshed')
})


gulp.task('default',function(callback){
  runSequence( 'clean','copy','reload','watch',callback )
})

gulp.task('watch',function() {  
  livereload.listen()
  
  gulp.watch(patt.backend, ['backend','reload']);
  gulp.watch(patt.frontend, ['frontend']);
  gulp.watch(patt.static, ['static']);
})

gulp.task('copy',['backend','frontend','static'])

gulp.task('clean', function () {
	gulp.src('dest/**/*', {read: false})
		.pipe(clean());
});

gulp.task('backend', function(){
  return gulp.src(patt.backend)
    .pipe(gulp.dest('./dest/scripts/backend'))
})

gulp.task('frontend', ['sass'], function(){
  
  gulp.watch(patt.sass, ['sass'])
  
  return gulp.src(patt.frontend)
    .pipe(gulp.dest('./dest/scripts/frontend'))
    .pipe(livereload())
})

gulp.task('static', function(){
  return gulp.src(patt.static)
    .pipe(gulp.dest('./dest/static'))
    .pipe(livereload())
})

gulp.task('sass', function () {
  return gulp.src(patt.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dest/css'))
    .pipe(livereload());
});
// clean up if an error goes unhandled.
process.on('exit', function() {
    if (node) node.kill()
})