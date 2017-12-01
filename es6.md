默认参数  字符串模板 解构赋值 箭头函数 set,map  异步操作 类与对象 模块化  构建工具
什么是任务自动化 （自动执行）gulp （文件流） 中文网，插件

自动构建  编译，转换成低版本的比如es5，es3
业务逻辑(页面，交互)
自动构建 编译 辅助(自动刷新，文件合并，资源压缩)
服务接口 数据 接口

编译工具(babel webpack)
mkdir es6
构建目录 tasks 
app server
touch 
安装node express
express -e . ejs模板引擎
npm init
.babelrc  babel编译的文件
gulp 的配置文件 gulpfile.babel.js

args.js
import yargs from 'yargs';
.option('production',{
    boolean:true,
    default:false,
    describe:'min all scripts' 
})

.option("watch",{
    boolean:true,
    default:false,
    describe:'watch all files'
})
//日志
.option("verbose",{
    boolean:true,
    default:false,
    describe:'log'
})
.option('sourcemaps',{
    describe:'force the creation of sroucemaps'
})

.option('port',{
    string:true,
    default:8080,
    describe:'server port'
})

.argv

//script.js
import gulp from 'gulp';
import gulp from 'gulp-if';
import concat from 'gulp-concat';
import webpack fom 'webpack';
import gulpEebpack from 'webpack-stream';
import named from 'vinyl-named';
import livereload from 'gulp-livereload';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import {log,colors} from 'gulp-util';
import args from './util/args';

gulp.task('scripts',()=>{
    return gulp.src(['app/js/index.js'])
    .pipe(plumber({
        errorHandle:function(){}
    }))
    .pipe(named())
    .pipe(gulpWebpack({
        module:{
        loaders:[{
            test:/\.js$/,
            loader:'babl'
        }]
    }
    }),null,(err,stats)=>{
        log(`Finished '${colors.cyan('scripts')}'`,stats.toString({
            chunks:false
        }))
    })
    .pipe(gulp.dest('server/public/js'))
    .pipe(rename{
        basename:'cp',
        extname:'.min.js'
    })
    .pipe(uglify({compress:{properties:false},output:{'quote_keys':true}}))
    .pipe(gulp.dest('server/public/js'))
    .pipe(gulpif(args.watch,livereload()))
}) 



//page.js
import gulp from 'gulp';
import gulpif from 'gulp-if';
import livereload from 'gulp-livereload';
import args from './util/args';

gulp.task('pages',()=>{
    return gulp.src('app/**/*.ejs')
    .pipe(gulp.dest('server'))
    .pipe(gulpif(args.watch,livereload()))

})

//css.js
import gulp from 'gulp';
import gulpif from  'gulp-if';
import livereload from 'gulp-livereload';
import args from './util/args';

gulp.task('css',()=>{
    return gulp.src('app/**/*.css')
    .pipe(gulp.dest('server/public'))
    .pipe(gulpif(args.watch,livereload()));
})


//server.js

import gulp from 'gulp';
import gulpif from 'gulp-if';
import liveserver from 'gulp-live-server';
import args from './util/args';

gulp.task('serve',(cb)=>{
    if(!args.watch) return cb();

    var server = liveserver.new(['--harmonhy','server/bin/www']);
    server.start();

    gulp.watch(['server/public/**/*.js','server/views/**/*.ejs'],functon(file){
        server.notify.apply(server,[file]);
    })

    gulp.watch(['server/routes/**/*.js','server/app.js'],function(){
        server.start.bind(server)()
        });
})

//browser.js
import gulp from 'gulp';
import gulpif from 'gulp-if';
import gutil from 'gulp-util';
import args from './util/args';
gulp.task('browser',(cb)=>{
    if(args.watch) return cb();
    gulp.watch('app/**/*.js',[scripts]);
    gulp.watch('app/**/*.ejs',[pages]);
    gulp.watch('app/**/*.css',[css]);

})
//clean 
import gulp from 'gulp';
import del from 'del';
import args from './util/args';

gulp.task('clean',()=>{
    return del(['server/public','server/views']);
})
//默认的动作gulp  default   build.js
import gulp from 'gulp';
import gulpSequence from 'gulp-sequence' ;
gulp.task('build',gulpSequence('celan','css','pages','scripts',['browser','serve']));

//default.js 默认不带参数gulp
import gulp from 'gulp';
gulp.task('default',['build']);

// babelj-load babel-core
//gulpfile.babel.js
import requireDir from 'require-dir';
requireDir('./tasks');
//.babelrc  npm install babel-preset-es2015 --save-dev
{
    'presets':["es2015"]
}
//let const 在es6中自动开启严格模式 use strict  在es5中自动开启，就是变量未声明，不能直接使用
//块级作用域 {}
function test(){
    for(let i=1;i<3;i++){
    console.log(i);
    }
    console.log(i);
}
{
    let a = 1;
    let a = 2;//不能重复
    const pi = 111;//声明常量必须赋值，不能更
    const k = {
    a:1
    }
      k.b = 2;
      //因为对象存储的是指针。
}
//解构赋值  变量交换
{
    let a = 1;
    let b = 2;
    [a,b] = [b,a]

}
//不用取索引即可赋值
{
    function f(){
    return [1,2];

    }
    let a,b;
    [a,b] = f();
}
//选择性的接受某几个变量，忽略几个变量
{
    function f(){
    return [1,2,3,4,5,6,7]
    }
    let a,b,c;
    [a,b,,,,c] = f();
}
//不知道有多少参数，只要第一个参数
{
    function f(){return [1,2,3,4,5,6,7]}
    let a,b
    [a,...b] = f();

}
//对象解构赋值
{
    let o = {p:42,q:true};
    let {p,q} = o;
    console.log(p,q);
}

{
    let {a=5,c=5} = {a:6};
    console.log(a,b);

}
{
    let metaData = {
        title:'abc',
        test:[{
            title:'test',
            desc:'desc'
        }]
    }
    let {title:eTitle,test:[{title:cTitle}]}
}

//正则扩展   u y 新增
//在es6中充许第一个参数是正则，第二个参数的修饰符会覆盖前面的修饰符
//flags新增，用来获取正则的修饰符
{
    let regex = new RegExp('xyz','i');
    let regex2 = new RegExp(/xyz/i);
    console.log(regex.test('xyz123'),regex2.test('xyz123'));
    let regex3 ＝ new regExp(/xyz/ig,'i');
    console.log(regex3.flags)

}

{
    let s = "bbb_bb_b";
    let a1 = /b+/g;
    let a2 = /b+/y;
    //g是只要正则中有相对应的，而y的下一个字符必须要有 sticky用来检测是否开启y
    console.log("one",a1.exec(s),"two",a2.exec(s));
    console.log("one",a1.exec(s),"two",a2.exec(s));
    console.log(a1.sticky,a2.sticky);



}
//.能匹配任何字符(换行，回车，行，段)，能匹配小于一个字节的 要匹配大于一个字节的要用U

{

}
//npm install babel-polyfill --save-dev
//字符串  unicode表示法  遍历接口  模板字符串   
{
    console.log('a','\u0061');
    console.log('s','\u20BB7');//超过了0xff
    console.log('s',\u{20BB7});

}
{
    let s = '吉';
    console.log('s',s.length);
    //es5
    console.log('0',s.charAt(0));
    console.log('1',s.charAt(1));
    console.log('at0',s.charCodeAt(0));
    console.log('at1',s.charCodeAt(1)); 
    //es6
    let s1 = '吉2';
    console.log('length',s1.length);
    console.log('code1',s1.codePointAt(0));
    console.log('code2',s1.codePointAt(0).toString(16));

}
{
    //能否处理unicode字符
    console.log(String.fromCharCode("0x20bb7"));//es5
    console.log(String.fromCodePoint("0x20bb7"));//es6//大于2个字节
}

{
    let str = '\u{20bb7}abc';
    for(let i=0;i<str.length;i++){

        console.log('es5',str[i]);
    }
    for(let code of str){
    console.log("es6",code)
    }
}

//include 是否包含
{
    let str = "string";
    console.log('include',str.includes("c"));
    console.log('start',str.startsWith('str'));//str开头
    console.log('end',str.endWith('ng'));
    console.log('repeat',str.repeat(2));

}
//es6模板
{
    let name = "list";
    let info = "hello word";
    let m = `i an ${name},${info}`;
    console.log(m);
}
//向前补位 日期
{
    console.log('1'.padStart(2,'0'));
    console.log('1'.padEnd(2,'0'));
}
//标签模板 防止xss攻击 ，使用相同的模板返回不同的结果
{
    let user = {
        name:'list',
        info:'hello world'
    };
    abc`i am ${user.name},${user.info}`;
    function abc(s,v1,v2){
    console.log(s,v1,v2);
    }
}
//raw自动给前缀前反斜线
{
    console.log(String.raw`Hi\n${1+2}`);
    console.log(`Hi\n${1+2}`);
}
//二进制转十进制 0b小写大写都可以
{
    console.log(0b1111011);
    console.log(0o767);//八进制
}
{
    //判断是否有尽
    console.log('15',Number.isFinite(15));
    console.log('NaN',Number.isFinite(NaN));
    //判断这个数是否是数
    console.log('isNaN',Number.isNaN(0));
    //判断是否是整数，参数一定要是数
    console.log('23',Number.isInteger(23));
    console.log('23.0',Number.isInteger(23.0));
    console.log(Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER);
    //是否是安全的 参数一定要是数
    console.log('10',Number.isSafeInteger(10));
    //取小数的整数
    console.log(4.1,Math.trunc(4.1));
    console.log(4.2,Math.trunc(4.6));
    //判断正负数 非数值返回NaN
    console.log('-5',Math.sign(-5));
    console.log('0',Math.sign(0));
    console.log('5',Math.sign(5));
    //立方根
    console.log(‘8’,Math.cbrt(8));
    //三角函数

}
//数组
//获取页面节点的元素的时候的，比如document.getElementsByClass  伪数组
//函数新特性 参数默认值  rest参数  扩展运算符 箭头函数  this绑定  尾调用
