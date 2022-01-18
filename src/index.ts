const Transform = require("stream").Transform;
const compiler = require("webassembly/cli/compiler");
const fs = require("fs");
const path = require("path");

function buildWasm(source_dir = "c_cpp", dest_dir = "wasm") {
  var transformStream = new Transform({ objectMode: true });
  transformStream._transform = function (file, _encoding, callback) {
    console.log(file.path);
    var dir = "./" + dest_dir;
    var error = null,
      output = file;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, true);
    }

    let fileName = file.path.split("\\").pop().split("/").pop().split(".")[0];
    let subDir = file.path.split(source_dir)[1]?.split(fileName)[0] || "";
    let dest = path.resolve(dir + subDir, fileName + ".wasm");

    if (!fs.existsSync(dir + subDir)) {
      fs.mkdirSync(dir + subDir, { recursive: true });
    }

    compiler.main(["-o", dest, file.path], function (err, filename) {
      if (err) {
        error = err;
      } else {
        console.log(file.path + " saved to: " + dest);
      }
    });

    callback(error, output);
  };

  return transformStream;
}

module.exports = buildWasm;
