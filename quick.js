var quick = function(array,left,right){
	//该变量能帮助我们将子数组分离为较小值数组和较大值数组
	var index;
	//只用考虑大于1的情况
	if(array.length > 1){
		//将划分的结果返回给index
		index = partition(array,left,right);
		if(left < index -1){
			quick(array,left,index-1);
		}
		if(index<right){
			quick(array,index,right);
		}
	}
}


var partition = function(array,left,right){
	var pivot = array[Math.floor((right + left)/2) ],//选择中间项
		i = left,//低
		j = right;//高
		while( i <= j){//left和right没有相互交错，找行划分操作
			while(array[i] < pivot){//移动left指针直到找一个元素比主元素大
				i++;
			}
			while(array[j] > pivot ){//移动right指针直到找一个元素比主元素小
				j--;
			}
			if(i <= j){//当左指针指向的元素比主元大且右指针指向的元素比主元小，并且此时左指针索引没有右指针索引大（左项比右项大）
				swapQuickStort(array,i,j);//交换指针
				i++;
				j--;

			}
		}
		return i;
}

var swapQuickStort = function(array,index1,index2){
	var aux = array[index1];
	array[index1] = array[index2];
	array[index2] = aux;
}

array.prototype.quickSort = function(array,0,)

