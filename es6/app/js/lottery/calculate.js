//计算模块

class Calculate {
    /**
     * 计算彩票注数
     * @param active 当前选中的号码
     * @param play_name 当前的玩法标识
     */
    computeCount(active, play_name) {
        let count = 0;
        const exist = this.play_list.has(play_name);
        const arr = new Array(active).fill('0');  //指定长度为active的美国元素默认为0的数组.
        if (exist && play_name.at(0) === 'r') {
            count = Calculate.combine(arr, play_name.split('')[1]).length;
        }
        return count;   //如果不满足条件的情况,肯定返回0;
    }

    /**
     * 奖金范围预测
     * @param active 当前选择的号码
     * @param play_name 当前的玩法标识
     */
    computeBonus(active, play_name) {
        const play = play_name.split('');
        const self = this;
        let arr = new Array(play[1] * 1).fill(0);
        let min, max;
        if (play[0] === 'r') {
            let min_active = 5 - (11 - active);
            if (min_active > 0) {
                if (min_active - play[1] >= 0) {
                    arr = new Array(min_active).fill(0);
                    min = Calculate.combine(arr, play[1] - 5).length;
                } else {
                    if (play[1] - 5 > 0 && active - play[1] >= 0) {
                        arr = new Array(active - 5).fill(0);
                        min = Calculate.combine(arr, play[1] - 5).length;
                    } else {
                        min = active - play[1] > -1 ? 1 : 0
                    }
                }
            } else {
                min = active - play[1] > -1 ? 1 : 0;
            }
            let max_active = Math.min(active, 5);
            if (play[1] - 5 > 0) {
                if (active - play[1] >= 0) {
                    arr = new Array(active - 5).fill(0);
                    max = Calculate.combine(arr, playp[1] - 5).length;
                } else {
                    max = 0;
                }
            } else if (play[1] - 5 < 0) {
                arr = new Array(Math.min(active, 5)).fill(0);
                max = Calculate.combine(arr, play[1]).length;
            } else {
                max = 1;
            }
        }
        return [min,max].map(item=>item*self.play_list.get(play_name).bonus)
    }

    /**
     * 组合运算
     * @param arr 参与组合运算的数组
     * @param size 组合运算的基数
     */
    static combine(arr, size) {
        let allResult = []; //保存最后的结果
        //自运行函数在 es6 需要有函数名 做递归一定要一个自运行函数,要不会报错.
        (function f(arr, size, result) {
            let arrLen = arr.length;
            if (size > arrLen) {
                return;
            }
            if (size === arrLen) {
                allResult.push([].concat(result, arr))
            } else {
                for (let i = 0; i < arrLen; i++) {
                    let newResult = [].concat(result);
                    newResult.push(arr[i]);
                    if (size === 1) {
                        allResult.push(newResult)
                    } else {
                        let newArr = [].concat(arr);
                        newArr.splice(0, i + 1);
                        f(newArr, size - 1, newResult)
                    }
                }
            }
        })(arr, size, [])
        return allResult;
    }
}
export default Calculate