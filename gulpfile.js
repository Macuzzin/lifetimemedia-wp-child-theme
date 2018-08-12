var gulp            = require('gulp')
    sass            = require('gulp-sass'),
    autoprefixer    = require('gulp-autoprefixer'),
    browserSync     = require('browser-sync').create(),
    webpack         = require('webpack');

var sassOptions = {
    outputStyle: 'expanded' // Use 'compressed' for production.
};

var prefixerOptions = {
    browsers: ['last 2 versions']
};

gulp.task('styles', () => {
    console.log('Refresh sass!');
});

// Styles
gulp.task('styles', () => {
    return gulp.src('./sass/main.scss')
        .pipe(sass(sassOptions).on('error', sass.logError)) // Logs sass error and keeps watch task running.
        .pipe(autoprefixer(prefixerOptions))
        .pipe(gulp.dest('./css'));
});

// Scripts
gulp.task('scripts', (callback) => {
    webpack(require("./webpack.config.js"), (error, stats) => {
        if (error) {
            console.log(error.toString());
        }
        console.log(stats.toString());
        callback();
    });
});

// Watch for file changes.
gulp.task('watch', () => {

    browserSync.init({
        notify: false,
        proxy: "http://localhost:8888/my-project/",
        ghostMode: false
    });

    gulp.watch('./**/*.php', () => {
        browserSync.reload();
    });

    gulp.watch('./sass/**/*.scss', () => {
        gulp.start('cssInject');
    });

    gulp.watch('./js/**/*.js', () => {
        gulp.start('scriptsRefresh');
    });
});

// Stream updated main.css but wait for styles task to complete.
gulp.task('cssInject', ['styles'], () => {
    return gulp.src('./css/main.css')
        .pipe(browserSync.stream());
});

// Refresh js updates but wait till scripts task complete.
gulp.task('scriptsRefresh', ['scripts'], () => {
    browserSync.reload();
});