const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const uglify = require("gulp-uglify-es").default;
const del = require("del");
const autoprefixer = require("gulp-autoprefixer");
const cleancss = require("gulp-clean-css");
const imagemin = require("gulp-imagemin");
const fileInclude = require("gulp-file-include"); // Подключение html секций
const prettyHtml = require("gulp-pretty-html"); // Пакет позволяет сделать html красивым

gulp.task("server", () => {
	return browserSync.init({
		server: {
			baseDir: ["dist"], //Если запускать локально то расдкоментировать  код
		},
		port: 9000,
		open: false,
	});
});

gulp.task("scripts", () => {
	return gulp
		.src("./src/script/script.js")
		.pipe(uglify())
		.pipe(gulp.dest("dist/"))
		.pipe(browserSync.stream());
});

gulp.task("style", () => {
	return gulp
		.src("src/scss/style.scss")
		.pipe(sourcemaps.init())
		.pipe(sass().on("error", sass.logError))
		.pipe(
			autoprefixer({
				overrideBrowserslist: ["last 10 versions"],
				grid: true,
			})
		)
		.pipe(
			cleancss({ level: { 1: { specialComments: 0 } }, format: "beautify" })
		)
		.pipe(sourcemaps.write("./"))
		.pipe(gulp.dest("./dist/css/"))
		.pipe(browserSync.stream());
});

gulp.task("index", () => {
	return gulp
		.src("./src/**/*.html")
		.pipe(fileInclude())
		.pipe(
			prettyHtml({
				indent_size: 4,
				indent_char: " ",
				unformatted: ["code", "pre", "em", "strong", "span", "i", "b", "br"],
			})
		)
		.pipe(gulp.dest("dist/"))
		.pipe(browserSync.stream());
});

gulp.task("images", () => {
	return gulp
		.src("./src/img/**/*")
		.pipe(imagemin())
		.pipe(gulp.dest("dist/img/"));
});

gulp.task("clean", () => {
	return del("dist/**/*", { force: true });
});

gulp.task("watch", () => {
	gulp.watch("./src/script/*.js", gulp.series("scripts"));
	gulp.watch("./src/scss/**/*", gulp.series("style"));
	gulp.watch("./src/**/*.html", gulp.series("index"));
	gulp.watch("./src/img/**/*.png", gulp.series("images"));
});

gulp.task("build", gulp.series("clean", "scripts", "style", "images", "index"));
gulp.task("dev", gulp.series("build", gulp.parallel("watch")));
