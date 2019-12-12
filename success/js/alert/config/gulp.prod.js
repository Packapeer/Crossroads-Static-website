'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer'); // 处理css中浏览器兼容的前缀 

var pump = require('pump');
var babel = require('gulp-babel');
var rename = require('gulp-rename'); //重命名  
var cssnano = require('gulp-cssnano'); // css的层级压缩合并
var uglify = require('gulp-uglify'); //js压缩  

var Config = require('./gulp.config.js');


module.exports =function(){
    /** 
     * HTML处理 
     */
    gulp.task('html', function (cb) {
        pump([
            gulp.src(Config.html.src),
            gulp.dest(Config.html.dist),
        ], cb);
    });

    gulp.task('font', function (cb) {
        pump([
            gulp.src(Config.font.src),
            gulp.dest(Config.font.dist),
        ], cb);
    });

    /** 
 * CSS样式处理 
 */
    gulp.task('css', function (cb) {
        pump([
            gulp.src(Config.css.src),
            autoprefixer({
                browsers: ['last 2 version'],//浏览器版本 
            }),
            gulp.dest(Config.css.dist),
            cssnano(),
            rename({
                suffix: '.min'
            }),
            gulp.dest(Config.sass.dist),
        ], cb);
    });
    /** 
     * sass样式处理 
     */
    gulp.task('sass', function (cb) {
        pump([
            gulp.src(Config.sass.src),
            sass({
                outputStyle: 'expanded'
            }),
            autoprefixer({
                browsers: ['last 2 version'],//浏览器版本 
            }),
            gulp.dest(Config.sass.dist),
            cssnano(),
            rename({
                suffix: '.min'
            }),
            gulp.dest(Config.sass.dist),
        ], cb);
    });
    /** 
     * js处理 
     */
    gulp.task('js', function (cb) {
        pump([
            gulp.src(Config.js.src),
            babel({
                presets: ['es2015']
            }),
            gulp.dest(Config.js.dist),
            rename({
                suffix: '.min'
            }),
            uglify(),
            gulp.dest(Config.js.dist),
        ], cb);
    });
    gulp.task('prod', ['html', 'js','sass','font','css']);
}
