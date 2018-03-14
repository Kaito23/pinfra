// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var less = require('gulp-less');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var util = require('gulp-util');
var cleanCSS = require('gulp-clean-css');
var rename = require('gulp-rename');

// Compile Our less
gulp.task('less', function() {
	return gulp.src('less/style.less')
		.pipe(less().on('error', util.log))
        .pipe(rename('pinfra.css'))
		.pipe(gulp.dest('css'))
		.pipe(reload({stream: true}));
});

gulp.task('browser-sync', function () {
	var files = [
		'less/*.less'
	];

	browserSync.init(files, {
		server: {
			baseDir: './'
		}
	});
});

gulp.task('minify-css', () => {
  return gulp.src('css/*.css')
    .pipe(cleanCSS({}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('css/min'));
});

// Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch('less/*.less', ['less']);
});

// Default Task
gulp.task('default', ['less', 'watch', 'browser-sync', 'minify-css']);
