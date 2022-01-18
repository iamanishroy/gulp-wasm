# gulp-wasm

gulp-wasm is a [gulp](https://github.com/wearefractal/gulp) plugin to automates building wasm files from `c` and `c++` files.

[![NPM](https://nodei.co/npm/gulp-wasm.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/gulp-wasm/)

## Usage

gulp-wasm provide a simple method for building wasm files from `c` and `c++` files.

```javascript
const gulp = require("gulp");
const buildWasm = require("gulp-wasm");

gulp.task("build-wasm", function () {
  return gulp
    .src(["c_cpp/**/*.c"])
    .pipe(buildWasm("c_cpp").on("error", () => {}));
});
```

**Click [here](https://github.com/iamanishroy/gulp-wasm/blob/main/gulpfile.js#L26) for more examples.**

## Support

Please [open an issue](https://github.com/iamanishroy/wasm-boilerplate/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/iamanishroy/wasm-boilerplate/compare/).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
