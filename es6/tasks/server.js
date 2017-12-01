import gulp from 'gulp';
import gulpif from 'gulp-if';
import liveserver from 'gulp-live-server';
import args from './util/args.js';

gulp.task('serve',(cb)=>{
	if(!args.watch) return cb();

	var server = liveserver.new(['--harmony','server/bin/www']);
	server.start();
	//console.log(111);
	gulp.watch(['server/public/**/*.js','server/views/**/*.ejs'],function(file){
		server.notify.apply(server,[file]);//通知服务器更改
	})

	gulp.watch(['server/routes/**/*.js','server/app.js'],function(){
		server.start.bind(server)();//服务重启
	})
})