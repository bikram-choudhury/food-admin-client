var gulp = require('gulp'),
	less = require('gulp-less'),
	path = require('path'),
	sourcePath = 'src/assets/less/*.less',
	destPath = './src/assets/css/';
 
gulp.task('less2css', function () {
  return gulp.src(sourcePath)
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest(destPath));
});
gulp.task('watch-less',['less2css'],function(){
	gulp.watch(sourcePath,['less2css']);
});