function Stack(){
 	//利用数组dataStore保存栈内元素
	this.dataStore = [];
	//top记录栈顶位置
	this.top = 0;
	//向栈中压入新元素
	this.push = push;
	//返回栈顶元素
	this.pop = pop;
	//返回数组的第top-1个元素，栈顶元素
	this.peek = peek;
	this.clear = clear;
	this.length = length;

}

function push(element){
	this.dataStore[this.top++] = element;
}

function pop(){
	return this.dataStore[--this.top];
}

//对一个空栈，结果为undefined
function peek(){
	return this.dataStore[this.top-1];
}

function clear(){
	this.top = 0;
	this.dataStore = [];
}

function length(){
	return this.top;
}


var s = new Stack();
s.push("David");
s.push("Raymond");
s.push("Bryan");
console.log(s.dataStore);
console.log(s.length());
console.log(s.peek());
s.push("Cynthia");
console.log(s.peek());
console.log(s.dataStore);
s.clear();
console.log(s.top);
console.log(s.peek());
console.log(s.dataStore);
console.log(s.push("cls"));
console.log(s.peek());
/*
（1) 最高位为 n % b,将此位压入栈。
 (2) 使用 n/b 代替 n。
 (3) 重复步骤 1 和 2,直到 n 等于 0,且没有余数。
(4) 持续将栈内元素弹出,直到栈为空,依次将这些元素排列,就得到转换后数字的字符
串形式。
*/

function mulBase(num,base){
	var s = new Stack();
	do{
		s.push(num % base);
		num = Math.floor(num /= base);
	}while(num > 0);
	var converted = '';
	while(s.length() > 0){
		converted += s.pop();
	}
	return converted;
	
}

var num = 12;
var base = 2;
var newNum = mulBase(num,base);
console.log(newNum);
console.log(mulBase(16,8));

//回文是指这样一种现象:一个单词、短语或数字,从前往后写和从后往前写都是一样的。
//判断是否是回文
function isPalindrome(word){
	var s = new Stack();
	for(var i=0;i<word.length;++i){
		s.push(word[i]);
	}
	var rword = "";
	while(s.length() > 0){
		rword += s.pop();
	}
	if(word == rword){
		return true;
	}else{
		return false;
	}
}

var word = "hello";
if(isPalindrome(word)){
	console.log(word+" is");
}else{
	console.log(word+" not is");
}


console.log(isPalindrome("RacEcaR"));

//使用栈来实现递归

function factorial(n){
	if( n === 0){
		return 1;
	}else{
		return n * factorial(n-1);
	}
}
console.log(factorial(5));

function fact(n){
	var s = new Stack();
	while(n > 1){
		s.push(n--);
	}
	var pro = 1;
	while(s.length() > 0){
		pro *= s.pop();
	}
	return pro;
}

console.log(fact(5));


//一个算术表达式的后缀表达式形式
//表达式中的{和}，(和)，[和]必须是匹配的，不然的话表达式就会出现语法错误，使用栈可以判断表达式中的括号是否左右匹配。思路是遇到左括号就入栈，遇到右括号就和当前栈顶元素匹配，如果匹配成功就将栈顶元素出栈，最后判断栈中元素个数，如果是0就代表是完整的，否则就是不完整的

function isMath(str){
	var left = "({[";
	var right = ")}]";
	var s = new Stack();
	var i = 0;
	while(str[i]){
		//左符号入栈
		if(left.indexOf(str[i]) > -1){
			s.push(str[i])
		}
		//遇到右符号
		else if(right.indexOf(str[i]) > -1 && right.indexOf(str[i]) == left.indexOf(s.peek())){
			s.pop();
		}
		i++;
	} 
	console.log("=======");
	if(s.length() == 0){
		console.log(str+"is match success");
	}else{
		console.log(str+"is not match");
	}
}

isMath("2.3 + {23 / 12 + (3.14159×0.24)");

//中缀表达式，后缀表达式
//设计并实现一个 JavaScript 函 数,该函数可以将中缀表达式转换为后缀表达式,然后利用栈对该表达式求值
/*-------------------栈将中缀表达式转换成后缀表达式-------------------*/


function suffixExpression(){
	var str = 'a+b*c+(d*e+f)*g';
	var stack = new Stack();
	var outStack = new Array();
	for (var i=0;i<str.length;i++){
		if(')' == str[i]){
			while(true){
				var top = stack.peek();
				stack.pop();
				if('(' != top){
					outStack[outStack.length] = top;
				}else{
					break;
				}

			}
		}else if(['-','+'].indexOf(str[i]) > -1){
			if(['*','/'].indexOf(str[i]) > -1){
				while(['*','/'].indexOf(stack.peek()) > -1){
					outStack[outStack.length] = stack.peek();
					stack.pop();
				}
				outStack[outStack.length] = str[i];
			}else{
				stack.push(str[i]);
			}

		}else if(['(','*','/'].indexOf(str[i]) > -1){
			stack.push(str[i]);
		}else{
			outStack[outStack.length] = str[i];
		}
	}

	for(var i=0;i<outStack.length;i++){
		console.log(outStack[i]);
	}
}




suffixExpression();