var gulp = require('gulp');

var assetsDev = 'assets/';
var assetsProd = 'src/';

var appDev = 'dev/';
var appProd = 'app/';

/* Mixed */
var ext_replace = require('gulp-ext-replace');
var debug = require('gulp-debug');

/* CSS */
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var sass = require('gulp-sass');
var precss = require('precss');
var cssnano = require('cssnano');

/* JS & TS */
var jsuglify = require('gulp-uglify');
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
gulp.task('build-css', function () {
    return gulp.src(assetsDev + 'scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([precss, autoprefixer, cssnano]))
        .pipe(sourcemaps.write())
        .pipe(ext_replace('.css'))
        .pipe(gulp.dest(assetsProd + 'css/'));
});

gulp.task('iconfont', function() {

    fs.readdir('assets/fonts/iconfont/svg/', function(err, files){ // '/' denotes the root folder
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
                    fs.unlink( 'assets/fonts/iconfont/svg/' + fileName);
                    fs.renameSync( 'assets/fonts/iconfont/svg/' + filesIcon, 'assets/fonts/iconfont/svg/' + fileName );
                }
            }
        });
        gulp.src(['assets/fonts/iconfont/svg/*.svg'])
            .pipe(plumber())
            .pipe(iconfont({
                fontName: 'iconfont', // required
                prependUnicode: true, // recommended option
                centerHorizontally: true,
                normalize: true
            }))
            .on('glyphs', function(glyphs, options) {
                gulp.src('assets/fonts/iconfont/_icons.scss')
                    .pipe(plumber())
                    .pipe(consolidate('lodash', {
                        glyphs: glyphs,
                        fontName: 'iconfont',
                        fontPath: '/assets/fonts/iconfont/',
                        className: 'icon'
                    }))
                    .pipe(plumber.stop())
                    .pipe(gulp.dest('assets/scss/general'));

                gulp.src('assets/fonts/iconfont/icons.html')
                    .pipe(plumber())
                    .pipe(consolidate('lodash', {
                        glyphs: glyphs,
                        fontName: 'iconfont',
                        fontPath: '/assets/fonts/iconfont/',
                        className: 'icon'
                    }))
                    .pipe(plumber.stop())
                    .pipe(gulp.dest('assets'));
            })
            .pipe(plumber.stop())
            .pipe(gulp.dest('assets/fonts/iconfont'));
    });

});

gulp.task('build-ts', function () {
    return gulp.src(appDev + '**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write())
        //.pipe(jsuglify())
        .pipe(gulp.dest(appProd));
});

gulp.task('build-img', function () {
    return gulp.src(assetsDev + 'img/**/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(assetsProd + 'img/'));
});

gulp.task('build-html', function () {
    return gulp.src(appDev + '**/*.html')
        .pipe(gulp.dest(appProd));
});

gulp.task('watch', function () {
    gulp.watch(appDev + '**/*.ts', ['build-ts']);
    gulp.watch(assetsDev + 'scss/**/[^_]*.scss', ['build-css']);
    gulp.watch(assetsDev + 'img/*', ['build-img']);
});

gulp.task('default', ['watch', 'build-ts', 'iconfont', 'build-css']);