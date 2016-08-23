const gulp = require('gulp');
const sass = require('gulp-sass');
const jade = require('gulp-jade');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const zip = require('gulp-zip');

//SCSS
gulp.task('styles', () => {
	gulp.src('dev/css/**/*.scss')
		.pipe(gulp.dest('./src/css/'))
		.pipe(sass({
			outputStyle: 'compressed',
			errLogToConsole: true
		}))
		.pipe(rename(function(path) {
			path.basename += '.min';
		}))
		.pipe(gulp.dest('./src/css/'));
});

//Jade
gulp.task('templates', () => {
	gulp.src('dev/jade/**/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('./src/'))
});

//Uglify
gulp.task('compress', () => {
	gulp.src('dev/js/**/*.js')
		.pipe(gulp.dest('./src/js/'))
		.pipe(uglify())
		.pipe(rename(function(path) {
			path.basename += '.min';
		}))
		.pipe(gulp.dest('./src/js/'));
});

//Ship it!
gulp.task('shipit', () => {
	return gulp.src('src/*')
		.pipe(zip('simple-switch.zip'))
		.pipe(gulp.dest('dist'));
});

//Watch task
gulp.task('default', () => {
	gulp.watch('dev/css/**/*.scss',['styles']);
	gulp.watch('dev/js/**/*.scss',['compress']);
	gulp.watch('dev/**/*.jade',['templates']);
});
