"use strict";
const gulp = require("gulp");
const ts = require('gulp-typescript');
const del = require("del");
const merge = require("merge2");
const read = require("gulp-read");
const uglify = require('gulp-uglify');

const paths = {
    tsconfig: "./src/tsconfig.json",
    tsGlob: "./src/**/*.ts",
    dest: "./dist",
};

gulp.task("build", function () {
    let tsProject = ts.createProject(paths.tsconfig, { declaration: true });

    let tsResult = gulp.src(paths.tsGlob, { read: false })
        .pipe(read())
        .pipe(tsProject());

    tsResult.on("error", () => {
        changed.reset();
        throw "Typescript build failed.";
    });

    return merge([
        tsResult.dts
            .pipe(gulp.dest(paths.dest)),
        tsResult.js
            .pipe(uglify())
            .pipe(gulp.dest(paths.dest))
    ]);
});

// gulp.task("clean", function () {
//     return del([
//         "./.localStorage"
//     ]);
// });

gulp.task('watch', function () {
    gulp.watch('src/**/*.ts', gulp.series('build'));
});

gulp.task('start', gulp.series('build', 'watch'));

