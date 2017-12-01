{
	//Generator 异步编程的解决方案
	let tell = function *(){
		yield 'a';
		yield 'b';
		return 'c';
	}

	let k = tell();
	console.log(k.next());
	console.log(k.next());
	console.log(k.next());
	console.log(k.next());
}
{
	let obj = {};
	obj[Symbol.iterator] = function * (){
		yield 1;
		yield 2;
		yield 3;
	}

	for(let key of obj){
		console.log('key:',key);
	}
}
{
	//状态机 abc三种状态去描述一个事务
	let state = function * (){
		while(1){
			yield 'A';
			yield 'B';
			yield 'C';
		}
	}

	let states = state();
	console.log(states.next());
	console.log(states.next());
	console.log(states.next());
	console.log(states.next());
}
{
	let draw = function(count){
		//抽奖逻辑
		console.info(`剩余${count}`);

	}
	let residue = function*(count){
		while(count>0){
			count--;
			yield draw(count);
		}
	}
	let start = residue(5);
	let btn = document.createElement('button');
	btn.id = 'start';
	btn.textContent = 'test';
	document.body.appendChild(btn);
	document.getElementById('start').addEventListener('click',function(){
		start.next();
	},false)


	//长轮询  服务端如果有变化，可更改
	let ajax = function * (){
		yield new Promise(function(resolve,reject){
			setTimeout(function(){
				resolve({code:1})
			},200);
		})
	}

	let pull = function(){
		let genertator = ajax();
		let step = genertator.next();
		step.value.then(function(d){
			if(d.code !=0 ){
				var  i = 0;
				setTimeout(function(){
					console.info('wait:',`${++i}次`);
					pull();
				},1000)
			}else{
				console.info(d);
			}
		})
	}

	pull();
}