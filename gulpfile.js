let project_folder = "dist";
let source_folder = "src";

let path={
  build:{
      html: project_folder+"/",
      img: project_folder+ "/images/",
      
  },
  src: {
      html: source_folder+"/**/*.html", 
      images: source_folder+ "/images/**/*.{jpg,png,svg,gif.ico,webp}",
    },
  watch: {
    html: source_folder+"/**/*.html",
    images: source_folder+ "/images/**/*.{jpg,png,svg,gif.ico,webp}",
  },
  clean: "./" + project_folder + "/"
}

let {src, dest} = require('gulp');
    gulp = require('gulp'),
    browsersync = require('browser-sync').create();
    fileinclude = require('gulp-file-include');
    del = require('del');
             

function browserSync(params) {
  browsersync.init({
    server:{
      baseDir: "./" + project_folder + "/"
    },
    port: 3000,
    notify: false
  })
}

function html(){
  return src(path.src.html)
      .pipe(fileinclude())
      .pipe(dest(path.build.html))
      .pipe(browsersync.stream())
}
function img(){
  return src(path.src.images)
      .pipe(dest(path.build.img))
      .pipe(browsersync.stream())
}


function watchFiles(params){
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.images], img);
}

function clean(params){
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(html, img));
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.img = img;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;