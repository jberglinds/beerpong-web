let gulp = require('gulp');
let browserSync = require('browser-sync').create();
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

	browserSync.init({
		server: "./"
	});

	gulp.watch("scss/*.scss", ['sass']);
	gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp.src("scss/*.scss")
		.pipe(sass({
			outputStyle: 'compressed',
		}))
		.on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
		.pipe(gulp.dest("css"))
		.pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
