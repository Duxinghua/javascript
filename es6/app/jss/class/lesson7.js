//Proxy代理 Reflect返射
{
	let obj = {
		time:'2017-03-11',
		name:'net',
		_r:123
	}
	let monitor = new Proxy(obj,{
		get(target,key){
			return target[key].replace('2017','2018');
		},
		set(target,key,value){
			if(key === 'name'){
				return target[key] = value;
			}else{
				return target[key];
			}
		},
		has(target,key){
			if(key === 'name'){
				return target[key]
			}else{
				return false;
			}

		},
		deleteProperty(target,key){
			if(key.indexOf('_') > -1){
				delete target[key];
				return true;
			}else{
				return target[key]
			}
		},
		//拦截object.keys,object.getOwnpropertySymbols,object.getOwnPropertyNames
		ownKeys(target){
			return Object.keys(target).filter(item => item != 'time');
		}
	});
	console.log('get',monitor.time);
	monitor.time = 2018;
	monitor.name = 'test';
	console.log('set',monitor.time,monitor.name);
	console.log('has','name' in monitor,'time' in monitor);
	//delete monitor.time;
	//console.log('delete',monitor);
	//delete monitor._r;
	//console.log('delete',monitor);
	console.log('ownKeys',Object.keys(monitor));
}
{
	let obj = {
		time:'2017-03-11',
		name:'net',
		_r:123
	};
	console.log('Reflect get',Reflect.get(obj,'time'));
	Reflect.set(obj,'name','test');
	console.log(obj);
	console.log('has',Reflect.has(obj,'name'));


}
{
	//逻辑和代码完全隔离开
	function validator(target,validator){
		return new Proxy(target,{
			_validator:validator,
			set(target,key,value,proxy){
				if(target.hasOwnProperty(key)){
					let va = this._validator[key];
					if(!!va(value)){
						return Reflect.set(target,key,value,proxy);
					}else{
						throw Error(`not set ${key} to ${value}`);
					}
				}else{
					throw Error(`${key} not`);
				}
			}
		})
	}

	const personValidators = {
		name(val){
			return typeof val === 'string';
		},
		age(val){
			return typeof val === 'number' && val > 18
		}

	}

	class Person{
		constructor(name,age){
			this.name = name;
			this.age = age;
			return validator(this,personValidators);
		}
	}
	const person = new Person('li',30);
	console.info(person);
	 person.name = 11;
	 console.info(person);
}