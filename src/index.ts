const Transform = require("stream").Transform;
const compiler = require("webassembly/cli/compiler");
const fs = require("fs");
const path = require("path");

type options = {
  sourceDir?: string;
  destDir?: string;
  optimize?: boolean;
  quiet?: boolean;
  debug?: boolean;
  bare?: boolean;
  stack?: string;
  main?: string;
  define?: string;
  headers?: string;
  include?: string;
  link?: string;
};

/*
-o, --out        Specifies the .wasm output file. Defaults to stdout.
  -d, --debug      Prints debug information to stderr.
  -q, --quiet      Suppresses informatory output.

  Module configuration:

  -O, --optimize   Optimizes the output file and removes dead code.
  -s, --stack      Specifies the stack size. Defaults to 10000.
  -m, --main       Executes the specified function on load.
  -D, --define     Defines a macro.

  Includes and libraries:

  -I, --headers    Includes C headers from the specified directories.
  -i, --include    Includes the specified source files.
  -l, --link       Links in the specified libraries after compilation.
  -b, --bare       Does not include the runtime library.
  */

const flags = {
  optimize: "-O",
  quiet: "-q",
  debug: "-d",
  bare: "-b",
  stack: "-s",
  main: "-m",
  define: "-D",
  headers: "-I",
  include: "-i",
  link: "-l",
};

function processOptions(options: options): string[] {
  let flaggedOptions: string[] = [];
  const keys: string[] = Object.keys(options);
  for (let i = 0; i < keys.length; i++) {
    if (options[keys[i]] && keys[i] !== "sourceDir" && keys[i] !== "destDir") {
      if (typeof options[keys[i]] === "boolean") {
        flaggedOptions.push(flags[keys[i]]);
      } else if (
        typeof options[keys[i]] === "string" &&
        options[keys[i]].trim() !== ""
      ) {
        flaggedOptions.push(flags[keys[i]]);
        flaggedOptions.push(options[keys[i]]);
      }
    }
  }
  return flaggedOptions;
}
function buildWasm(options: options = {}) {
  var args = processOptions(options);

  options.sourceDir = options.sourceDir || "c_cpp";
  options.destDir = options.destDir || "wasm";

  var transformStream = new Transform({ objectMode: true });
  transformStream._transform = function (file, _encoding, callback) {
    var dir = "./" + options.destDir;
    var error = null,
      output = file;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, true);
    }

    let fileName = file.path.split("\\").pop().split("/").pop().split(".")[0];
    let subDir =
      file.path.split(options.sourceDir)[1]?.split(fileName)[0] || "";
    let dest = path.resolve(dir + subDir, fileName + ".wasm");

    if (!fs.existsSync(dir + subDir)) {
      fs.mkdirSync(dir + subDir, { recursive: true });
    }
    compiler.main(["-o", dest, file.path, ...args], function (err, filename) {
      if (err) {
        error = err;
      } else {
        console.log(file.path + " saved to: " + filename);
      }
    });

    callback(error, output);
  };

  return transformStream;
}

module.exports = buildWasm;
