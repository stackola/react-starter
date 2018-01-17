var gulp = require('gulp');
var less = require('gulp-less'); 
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
 
 
/* Task to compile less */
gulp.task('compile-less', function() {  
  gulp.src('./less/main.less')
    .pipe(less())
    .pipe(gulp.dest('./css/'));
}); 
/* Task to watch less changes */
gulp.task('watch-less', function() {  
  gulp.watch('./less/**/*.less' , ['compile-less']);
});
 
gulp.task('serve', function () {
 
    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    }); 
    gulp.watch("./less/*.less").on("change", reload);
    gulp.watch("./*.html").on("change", reload);
});
 
/* Task when running `gulp` from terminal */
gulp.task('default', ['watch-less', 'serve']);