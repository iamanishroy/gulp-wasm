const gulp = require('gulp');
const ts = require('gulp-typescript');
const uglify = require('gulp-uglify');
const wasmBuild = require('./dist/index');


gulp.task('ts', function () {
    return gulp.src('src/**/*.ts')
        .pipe(ts({
            noImplicitAny: false,
            module: "commonjs",
            target: "es2016",
            // declaration: true,
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.ts', gulp.series('ts'));
});

gulp.task('start', gulp.series('ts', 'watch'));

// test tasks
gulp.task('build-wasm', function () {
    return gulp.src(['test/**/*.c'])
        .pipe(wasmBuild('c', 'test/wasm').on('error', () => { }))
});

gulp.task('test-wasm', function () {
    gulp.watch('test/**/*.c', gulp.series('build-wasm'));
});


gulp.task('test', gulp.series('ts', 'build-wasm', 'test-wasm'));


