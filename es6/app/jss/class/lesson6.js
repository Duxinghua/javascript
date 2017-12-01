{
	//es6的数据结构  Set Map
	let list = new Set();
	list.add(5);
	list.add(7);
	console.log(list.size);
	let arr = [1,2,3,4,5];
	let list1 = new Set(arr);
	console.log(list1.size);
}
{
	//这个功能可以去重
	let list = new Set();
	list.add(1);
	list.add(2);
	list.add(1);
	console.log('list',list);

	let arr = [1,2,3,4,2,2,4];
	let list1 = new Set(arr);
	//不会做数据类型转换 元素类型需要注意
	console.log('unique',list1);
	let arr1 = [];
	for(let index = 0;index<arr.length;index++){
		console.log(arr1.indexOf(arr[index]))
		if(arr1.indexOf(arr[index]) == -1){
				arr1.push(arr[index]);
		}
		
	}
	console.log(arr1);

}
{
	let arr = ['add','delete','clear','has'];
	let list = new Set(arr);
	console.log('has',list.has('add'));
	console.log('delete',list.delete('add'),list);
	console.log('clear',list.clear(),list);
}
{
	let arr = ['add','delete','clear','has'];
	let list = new Set(arr);
	for(let key of list.keys()){
		console.log('keys',key);
	}
	for(let value of list.values()){
		console.log('values',value);
	}
	for(let [key,value] of list.entries()){
		console.log('entries',key,value);
	}
	list.forEach(function(item){
		console.log(item);
	})
}
{
	//weakset接受的key必须是对象，是一个弱引用，是一个地址引用，不用检测回收
	//没有clear方法，不能遍历
	let weakList = new WeakSet();
	let arg = {};
	weakList.add(arg);
	console.log(weakList);

}
{
	let map = new Map();
	let arr = ['123'];
	map.set(arr,456);
	console.log('map',map,map.get(arr));


}
{
	let map = new Map([['a',123],['b',456]]);
	console.log("size",map.size);
	console.log("delete",map.delete('a'),map);
	console.log('clear',map.clear(),map);

}
{
	let weakmap = new WeakMap();
	let o = {};
	weakmap.set(o,123);
	console.log(weakmap.get(o));
}
{
	//数据结构横向对比，增，查，改，删

	let map = new Map();
	let array  = [];
	//增
	map.set('t',1);
	array.push({t:1});
	console.info('map-info',array,map);
	//查
	let map_exist = map.has('t');
	let array_exist = array.find(item => item.t);
	console.info(map_exist,array_exist);

	//改
	map.set('t',2);
	array.forEach(item=>item.t ? item.t = 2 : '');
	console.info('map-array',map,array);

	//删除
	map.delete('t');
	let index = array.findIndex(item=>item.t);
	array.splice(index,1);
	console.info('map-array-empty',map,array);

}
{
	// set 和array的对比
	let set = new Set();
	let array = [];
	let sets = {t:1};
	//增
	set.add(sets);
	array.push({t:1});
	console.log('set-array',set,array);
	//查
	let set_exist = set.has(sets);//这里的查，必须是声明的
	let array_exist = array.find(item => item.t);
	console.info('set-array',set_exist,array_exist);
	//改
	set.forEach(item => item.t ? item.t = 2 : '');
	array.forEach(item => item.t ? item.t = 2 : '');
	console.info('set-array',set,array);
	//删
	set.forEach(item => item.t ? set.delete(item):'');
	let index = array.findIndex(item => item.t);
	array.splice(index,1);
	console.info('set-array-empty',set,array);



}
{
	let item = {t:1};
	let map = new Map();
	let set = new Set();
	let obj = {};
	//增
	map.set('t',1);
	set.add(item);
	obj['t'] = 1;
	console.info("map-set-obj",map,set,obj);
	//查
	console.info({
		map_exist:map.has('t'),
		set_exist:set.has(item),
		obj_exist:'t' in obj
	})
	//改
	map.set('t',2);
	item.t = 2;
	obj['t'] = 2;
	console.info('map-set-obj-modify',map,set,obj);
	//删
	map.delete('t');
	set.delete(item);
	delete obj['t'];
	console.log('map-set-obj-delete',map,set,obj);
	//优先使用map,如果惟一使用set,对象，数组


}