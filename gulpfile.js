var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var clean = require('gulp-clean');
var exec = require('child_process').exec;
var git = require('gulp-git');
var argv = require('yargs').argv;
var runSequence = require('run-sequence');

/*
gulp server
gulp build
gulp deploy
*/

gulp.task("server", function() {
  var child = exec("wintersmith preview");
  child.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
  });
  child.stderr.on('data', function(data) {
    console.log('stderr: ' + data);
  });
  child.on('close', function(code) {
    console.log('closing code: ' + code);
  });
});


gulp.task('gh-pages', function() {
    return gulp.src('./build/**/*')
      .pipe(ghPages());
});

// Dependant task: 'gh-pages'. Wait for it to finish
gulp.task('clean', ['gh-pages'], function() {
  gulp.src(['./build','./.publish'], {read: false})
      .pipe(clean());
});

gulp.task("build", function() {
  var child = exec("wintersmith build --clean");
  child.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
  });
  child.stderr.on('data', function(data) {
    console.log('stderr: ' + data);
  });
  child.on('close', function(code) {
    console.log('closing code: ' + code);
  });
});

gulp.task('deploy', ['gh-pages', 'clean']);

gulp.task('add', function() {
  console.log('adding...');
  return gulp.src('.')
    .pipe(git.add());
});

gulp.task('commit', function() {
  console.log('commiting');
    return gulp.src('.')
      .pipe(git.commit('auto commit'));
});

gulp.task('push', function(){
  console.log('pushing...');
  git.push('origin', 'master', function (err) {
    if (err) throw err;
  });
});

// gulp.task('gitsend', ['add', 'commit', 'push']);

gulp.task('gitsend', function() {
  runSequence('add', 'commit', 'push');
});
