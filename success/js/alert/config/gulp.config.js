var SRC_DIR = './src/'; // 源文件目录  
var DIST_DIR = './dist/'; // 打包后存放的目录 
var TMP_DIR = './tmp/'; // 开发临时目录


module.exports = {
	src: SRC_DIR,
    dist: DIST_DIR,
    tmp:TMP_DIR,
    sass:{
        src: SRC_DIR + 'sass/*.scss', // SASS目录：./src/sass/ 
        tmp: TMP_DIR +'css',
		dist: DIST_DIR + 'css' // SASS文件生成CSS后存放的目录：./dist/css  
    },
    font:{
        src:SRC_DIR+'fonts/*',
        tmp:TMP_DIR+'fonts',
        dist:DIST_DIR+'fonts'
    },
	html: {
        src: SRC_DIR + '*.html',
        tmp: TMP_DIR,
		dist: DIST_DIR
	},
	css: {
        src: SRC_DIR + 'css/**/*.css', // CSS目录：./src/css/  
        tmp: TMP_DIR + 'css', // CSS文件build后存放的目录：./dist/css  
		dist: DIST_DIR + 'css' // CSS文件build后存放的目录：./dist/css  
	},
	js: {
        src: SRC_DIR + 'js/**/*.js', // JS目录：./src/js/  
        tmp: TMP_DIR + 'js', // JS文件build后存放的目录：./dist/js 
		dist: DIST_DIR + 'js', // JS文件build后存放的目录：./dist/js 
	}
}