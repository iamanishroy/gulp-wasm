"use strict";const Transform=require("stream").Transform,compiler=require("webassembly/cli/compiler"),fs=require("fs"),path=require("path"),flags={optimize:"-O",quiet:"-q",debug:"-d",bare:"-b",stack:"-s",main:"-m",define:"-D",headers:"-I",include:"-i",link:"-l"};function processOptions(e){let r=[];var i=Object.keys(e);for(let s=0;s<i.length;s++)e[i[s]]&&"sourceDir"!==i[s]&&"destDir"!==i[s]&&("boolean"==typeof e[i[s]]?r.push(flags[i[s]]):"string"==typeof e[i[s]]&&""!==e[i[s]].trim()&&(r.push(flags[i[s]]),r.push(e[i[s]])));return r}function buildWasm(p){var l=processOptions(p);p.sourceDir=p.sourceDir||"c_cpp",p.destDir=p.destDir||"wasm";var s=new Transform({objectMode:!0});return s._transform=function(r,s,e){var i="./"+p.destDir,t=null,o=r;fs.existsSync(i)||fs.mkdirSync(i,!0);var n=r.path.split("\\").pop().split("/").pop().split(".")[0],a=(null===(a=r.path.split(p.sourceDir)[1])||void 0===a?void 0:a.split(n)[0])||"",n=path.resolve(i+a,n+".wasm");fs.existsSync(i+a)||fs.mkdirSync(i+a,{recursive:!0}),compiler.main(["-o",n,r.path,...l],function(s,e){s?t=s:console.log(r.path+" saved to: "+e)}),e(t,o)},s}module.exports=buildWasm;