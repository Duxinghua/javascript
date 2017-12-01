{
	//异步有那些解决方案，传统的，回调函数，事件触发
	let ajax = function(callback){
		console.log("执行");
		setTimeout(function(){
			callback && callback.call();
		},1000)
	}
	ajax(function(){
		console.log("timeout");
	})

}
{
	let ajax  = function(){
		console.log("执行1");
		return new Promise(function(resolve,reject){
			setTimeout(function(){
				resolve();
			},1000)
		})
	}
	ajax().then(function(){
		console.log("promise","timeout2");
	})
}

{
	let ajax  = function(){
		console.log("执行2");
		return new Promise(function(resolve,reject){
			setTimeout(function(){
				resolve();
			},2000)
		})
	}
	ajax().then(function(){
		console.log("promise","1")
		return new Promise(function(resolve,reject){
				setTimeout(function(){
					resolve();
				},2000)
		}).then(function(){
			console.log("promise","2");
		})
	})
}
{
	let ajax  = function(num){
		console.log("执行3");
		return new Promise(function(resolve,reject){
			if(num>5){
				resolve();
			}else{
				throw new Error('出错了');
			}
		})
	}
	ajax(1).then(function(){
		console.log("log",6);
	}).catch(function(err){
		console.log(err);
	})
}
{
	//所有的图片加载完，再加载到页面
	function loadImg(src){
		return new Promise((resolve,reject)=>{
			let img = document.createElement("img");
			img.src = src;
			img.onload = function(){
				resolve(img);
			}
			img.onerror = function(error){
				reject(error)
			}
		})
	}

	function showImg(imgs){
		imgs.forEach(function(img){
			document.body.appendChild(img);
		})
	}


	// Promise.all([
	// 	loadImg("https://img10.360buyimg.com/n4/s260x260_jfs/t2194/154/2680502055/60896/d5e9eb90/5710a443N00c37c1e.jpg"),
	// 	loadImg("https://img10.360buyimg.com/babel/s200x200_jfs/t5695/346/5628250661/7550/20174479/5962e520Nccbf1cfd.jpg"),
	// 	loadImg("https://img10.360buyimg.com/babel/s200x200_jfs/t5743/361/5161487321/40888/9a892dee/595d0f07Ndfa29d78.png"),
	// 	loadImg("https://img14.360buyimg.com/babel/s200x200_jfs/t6097/307/4562437471/11977/66572b86/5965bb61N3008081b.jpg"),
	// 	loadImg("https://img11.360buyimg.com/jdcms/s440x440_jfs/t6730/272/1564841848/885935/dd6ddec1/595344f8Nea9da984.jpg")

	// ]).then(showImg);

	function showImgs(img){
		let p = document.createElement('p');
		p.appendChild(img);
		document.body.appendChild(p);

	}


	Promise.race([
		loadImg("https://img10.360buyimg.com/n4/s260x260_jfs/t2194/154/2680502055/60896/d5e9eb90/5710a443N00c37c1e.jpg"),
		loadImg("https://img10.360buyimg.com/babel/s200x200_jfs/t5695/346/5628250661/7550/20174479/5962e520Nccbf1cfd.jpg"),
		loadImg("https://img10.360buyimg.com/babel/s200x200_jfs/t5743/361/5161487321/40888/9a892dee/595d0f07Ndfa29d78.png"),
		loadImg("https://img14.360buyimg.com/babel/s200x200_jfs/t6097/307/4562437471/11977/66572b86/5965bb61N3008081b.jpg"),
		loadImg("https://img11.360buyimg.com/jdcms/s440x440_jfs/t6730/272/1564841848/885935/dd6ddec1/595344f8Nea9da984.jpg")

	]).then(showImgs);


}