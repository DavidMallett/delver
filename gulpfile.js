const gulp = require("gulp");
const pump = require("pump");
const sourcemaps = require("gulp-sourcemaps");
const terser = require("gulp-terser");
const ts = require("gulp-typescript");
// const tsProject = ts.createProject("tsconfig.json");
const es5Project = ts.createProject("tsconfig.es5.json");
const mocha = require("gulp-mocha");

let mochaOpts = {
    colors: true,
    reporter: "mochawesome",
    reporterOptions: {
        reportDir: "_dist/test-results",
        reportFilename: "test-results"
    },
    require: null // "ts-node/register"
}

const terserOpts = {
    parse: {
        // parse options
        ecma: 6
    },
    compress: {
        // compress options
        arrows: true,
        drop_console: true,
        ecma: 6,
        inline: 3, // same as true
        module: true,
        toplevel: true
    },
    mangle: {
        // mangle options
        eval: true,
        module: true,
        properties: {
            // mangle property options
        },
        toplevel: true
    },
    output: {
        // output options
        beautify: false, // defaults to true
        comments: "some",
        ecma: 6,
        preamble: "/* minified */"
    },
    sourceMap: {
        // source map options
        filename: "out.js",
        url: "inline"
    },
    ecma: 6, // specify one of: 5, 6, 7 or 8
    keep_classnames: false, // prevent mangling of class names
    keep_fnames: false, // prevent mangling of function names -- useful for Function.prototype.name
    module: true,
    nameCache: null, // or specify a name cache object
    safari10: false,
    toplevel: true,
    warnings: true
}

gulp.task("default", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("_dist"));
});

gulp.task("compile-es5", (cb) => {
    pump([
            es5Project.src(),
            es5Project(),
            gulp.dest("_dist/es5")
        ],
        cb
    )
})

gulp.task("compress-es5", (cb) => {
    pump([
            es5Project.src(),
            sourcemaps.init(),
                es5Project(),
                terser(terserOpts),
            sourcemaps.write(),
            gulp.dest("_compressed/es5")
        ],
        cb
    )
});

gulp.task("test-es5", (cb) => {
    pump([
            gulp.src("_dist/es5/**/*.spec.js"),
            mocha(mochaOpts)
        ],
        cb
    )
})

gulp.task("test-ts", (cb) => {
    mochaOpts.require = "ts-node/register";
    pump([
            gulp.src("src/**/*.spec.ts"),
            mocha(mochaOpts)
        ],
        cb
    )
})
