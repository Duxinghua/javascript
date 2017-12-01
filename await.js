var sleep = function (time) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(2);
        }, time);
    })
};

var start = async function () {
    // 在这里使用起来就像同步代码那样直观
    console.log('start');
    var c = await sleep(3000);
    console.log(c);
    console.log('end');
};

start();

var starts = async function () {
    for (var i = 1; i <= 10; i++) {
        console.log(`当前是第${i}次等待..`);
        await sleep(1000);
    }
};

starts();