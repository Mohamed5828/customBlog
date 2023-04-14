const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const purgecss = require("gulp-purgecss");

function buildStyles() {
  return src("**/*.scss")
    .pipe(sass())
    .pipe(purgecss({ content: ["../components/*.jsx"] }))
    .pipe(dest("css"));
}

function watchTask() {
  watch(["**/*.scss"], buildStyles);
}

exports.default = series(buildStyles, watchTask);
