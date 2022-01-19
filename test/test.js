const gulp = require('gulp');
const wasmBuild = require('../dist/index');

(() => {
    return gulp.src(['test/**/*.c'])
        .pipe(wasmBuild({
            sourceDir: 'c',
            destDir: "test/wasm",
            optimize: true,
            quiet: true,
        }).on('error', () => { }))
})();



