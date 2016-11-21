var gulp = require('gulp');

var assetsDev = 'public/assets/';
var assetsProd = 'public/src/';

var appDev = 'public/dev/';
var appProd = 'public/app/';

/* Mixed */
var ext_replace = require('gulp-ext-replace');
var debug = require('gulp-debug');
var concat = require('gulp-concat');

/* CSS */
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var sass = require('gulp-sass');
var precss = require('precss');
var cssnano = require('cssnano');
var concatCSS = require('gulp-concat-css');
var uglifyCSS = require('gulp-uglifycss');

/* JS & TS */
var uglify = require('gulp-uglify');
var typescript = require('gulp-typescript');
var tsProject = typescript.createProject('tsconfig.json');

/* Images */
var imagemin = require('gulp-imagemin');

/* Iconfonts */
var fs = require('fs');
var lodash = require('lodash');
var iconfont = require('gulp-iconfont');
var plumber = require('gulp-plumber');
var consolidate = require('gulp-consolidate');



/*
* TASKS
* */
gulp.task('css', function () {
    return gulp.src([assetsDev + 'css/style.css', assetsDev + 'scss/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([precss, autoprefixer, cssnano]))
        .pipe(sourcemaps.write())
        .pipe(concatCSS('app.css'))
        .pipe(uglifyCSS({
            "maxLineLen": 80,
            "uglyComments": true
        }))
        .pipe(gulp.dest(assetsProd + 'css/'));
});

gulp.task('iconfont', function() {

    fs.readdir(assetsDev + 'fonts/iconfont/svg/', function(err, files){ // '/' denotes the root folder
        if(err){
            throw err;
        }
        files.forEach(function(file) {
            var matches = file.match(/^(?:u([0-9a-f]{4,6})\-)(.*).svg$/i);
            if (matches) {
                var icon = lodash.indexOf(files, matches[2]+'.svg');
                if (icon >= 0) {
                    var fileName = matches[0];
                    var filesIcon = files[icon];
                    fs.unlink(assetsDev + '/fonts/iconfont/svg/' + fileName);
                    fs.renameSync(assetsDev + '/fonts/iconfont/svg/' + filesIcon, assetsDev + '/fonts/iconfont/svg/' + fileName );
                }
            }
        });
        gulp.src([assetsDev + '/fonts/iconfont/svg/*.svg'])
            .pipe(plumber())
            .pipe(iconfont({
                fontName: 'iconfont', // required
                prependUnicode: true, // recommended option
                centerHorizontally: true,
                normalize: true
            }))
            .on('glyphs', function(glyphs, options) {
                gulp.src(assetsDev + '/fonts/iconfont/_icons.scss')
                    .pipe(plumber())
                    .pipe(consolidate('lodash', {
                        glyphs: glyphs,
                        fontName: 'iconfont',
                        fontPath: '/assets/fonts/iconfont/',
                        className: 'icon'
                    }))
                    .pipe(plumber.stop())
                    .pipe(gulp.dest(assetsDev + '/scss/general'));

                gulp.src(assetsDev + '/fonts/iconfont/icons.html')
                    .pipe(plumber())
                    .pipe(consolidate('lodash', {
                        glyphs: glyphs,
                        fontName: 'iconfont',
                        fontPath: '/assets/fonts/iconfont/',
                        className: 'icon'
                    }))
                    .pipe(plumber.stop())
                    .pipe(gulp.dest(assetsDev));
            })
            .pipe(plumber.stop())
            .pipe(gulp.dest(assetsDev + '/fonts/iconfont'));
    });

});

gulp.task('ts', function () {
    return gulp.src(appDev + '**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write())
        //.pipe(uglify())
        .pipe(gulp.dest(appProd));
});

gulp.task('js', function () {
    return gulp.src([
        assetsDev + 'js/lib/*.js',
        assetsDev + 'js/scripts.js'
    ])
        .pipe(plumber())
        .pipe(concat('script.min.js'))
        .pipe(uglify({preserveComments: 'none'}))
        .pipe(plumber.stop())
        .pipe(gulp.dest(assetsProd + 'js/'));
});

gulp.task('img', function () {
    return gulp.src(assetsDev + 'img/**/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(assetsProd + 'img/'));
});

gulp.task('html', function () {
    return gulp.src(appDev + '**/*.html')
        .pipe(gulp.dest(appProd));
});

gulp.task('watch', function () {
    gulp.watch(appDev + '**/*.ts', ['ts']);
    gulp.watch(assetsDev + 'scss/**/*.scss', ['css']);
    gulp.watch(assetsDev + 'css/**/*.css', ['css']);
    gulp.watch(assetsDev + 'img/*', ['img']);
});

gulp.task('ts-watch', function() {
    gulp.watch(appDev + '**/*.ts', ['ts']);
});

gulp.task('default', ['watch', 'ts', 'iconfont', 'css']);