const gulp = require("gulp");
const pump = require("pump");
const sourcemaps = require("gulp-sourcemaps");
const terser = require("gulp-terser");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

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

gulp.task("compress", (cb) => {
    pump([
            tsProject.src(),
            sourcemaps.init(),
                tsProject(),
                terser(terserOpts),
            sourcemaps.write(),
            gulp.dest("_compressed")
        ],
        cb
    )
});
