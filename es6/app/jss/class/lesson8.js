{
	//类的基本定义 生成实例
	class Person{
		constructor(name='test'){
			this.name = name;
		}
	}
	let v_parent = new Person('v');
	console.info(v_parent);
	//继承
	class Child extends Person{
		constructor(name = 'child'){
			super(name);//super()放在第一行，调用父类的参数
			this.type = 'child';
		}
		get longName(){
			return 'mk'+this.name;
		}
		set longName(value){
			return this.name = value;
		}
		//静态方法 通过类去调用，而不是通过类的实例调用
		static tell(){
			console.log("static"," tell");
		}

	}
	console.log("extends",new Child('hellow'));
	let v = new Child();
	console.log("getter",v.longName);
	v.longName = "abcd";
	console.log("setter",v.longName);
	Child.tell();
	//设置使用静态属性
	Child.types = 'tests';
	console.log('static pro',Child.types);
}