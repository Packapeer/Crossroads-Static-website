'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var pump = require('pump');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();

var Config = require('./gulp.config.js');



module.exports = function () {
    /** 
     * HTML处理 
     */
    gulp.task('dev:html', function (cb) {
        pump([
            gulp.src(Config.html.src),
            gulp.dest(Config.html.tmp),
            browserSync.reload({
                stream: true
            })
        ],cb);
    });
        /** 
     * font 
     */
    gulp.task('dev:font', function (cb) {
        pump([
            gulp.src(Config.font.src),
            gulp.dest(Config.font.tmp),
            browserSync.reload({
                stream: true
            })
        ], cb);
    });
    /** 
     * CSS样式处理 
     */
    gulp.task('dev:css', function (cb) {
        pump([
            gulp.src(Config.css.src),
            gulp.dest(Config.css.tmp),
            browserSync.reload({
                stream: true
            })
        ], cb);
    });

    /** 
     * sass样式处理 
     */
    gulp.task('dev:sass', function (cb) {
        pump([
            gulp.src(Config.sass.src),
            plumber(),
            sass({
                outputStyle: 'expanded'
            }),
            autoprefixer('last 2 version'),
            gulp.dest(Config.sass.tmp),
            browserSync.reload({
                stream: true
            })
        ], cb);
    });
    /** 
     * js处理 
     */
    gulp.task('dev:js', function (cb) {
        pump([
            gulp.src(Config.js.src),
            gulp.dest(Config.js.tmp),
            browserSync.reload({
                stream: true
            })
        ], cb);
    });


    gulp.task('dev', ['dev:html','dev:sass', 'dev:js','dev:font'], function () {
        browserSync.init({
            server: {
                baseDir: Config.tmp
            },
            port: 3000,
            notify: false, //浏览器右上方弹窗小提示
            open: false // 自动打开浏览器
        });
        // 启动监视
        gulp.watch(Config.html.src, ['dev:html']);
        gulp.watch(Config.sass.src, ['dev:sass']);
        gulp.watch(Config.js.src, ['dev:js']);
    });
}