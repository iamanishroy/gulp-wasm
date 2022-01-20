# gulp-wasm

gulp-wasm is a [gulp](https://github.com/wearefractal/gulp) plugin to automates building wasm files from `c` and `c++` files.

[![NPM](https://nodei.co/npm/gulp-wasm.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/gulp-wasm/)

## Usage

gulp-wasm provide a simple method for building wasm files from `c` and `c++` files.

```javascript
const gulp = require("gulp");
const buildWasm = require("gulp-wasm");

gulp.task("build-wasm", function () {
  return gulp.src(["./c_cpp/**/*.c", "./c_cpp/**/*.cpp"]).pipe(
    buildWasm({
      optimize: true,
      quiet: true,
    })
  );
});
```

### Options

| **key** | **type** | **description**                     |
| ------- | -------- | ----------------------------------- |
| debug   | boolean  | Prints debug information to stderr. |
| quiet   | boolean  | Suppresses informatory output.      |

**Module configuration:**

| **key**  | **description**                                 |
| -------- | ----------------------------------------------- |
| optimize | Optimizes the output file and removes dead code |
| stack    | Specifies the stack size. Defaults to 10000     |
| main     | Executes the specified function on load         |
| define   | Defines a macro                                 |

**Includes and libraries:**

| **key** | **description**                                    |
| ------- | -------------------------------------------------- |
| headers | Includes C headers from the specified directories  |
| include | Includes the specified source files                |
| link    | Links in the specified libraries after compilation |
| bare    | Does not include the runtime library               |

<!-- **Click [here](https://github.com/iamanishroy/gulp-wasm/blob/main/gulpfile.js#L26) for more examples.** -->

## Support

Please [open an issue](https://github.com/iamanishroy/gulp-wasm/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/iamanishroy/gulp-wasm/compare/).

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
