   //浮点数计算bug解决
    function accMul(arg1,arg2){
    	//转换为字符串
        var m=0,s1=arg1.toString(),s2=arg2.toString();
        //计算小数位数
        try{m+=s1.split(".")[1].length}catch(e){}
        try{m+=s2.split(".")[1].length}catch(e){}
        //整数相乘，再除以10的几次方
        return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
    }
    function accAdd(arg1,arg2){
        var r1,r2,m;
        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
        m=Math.pow(10,Math.max(r1,r2));
        return (accMul(arg1,m)+accMul(arg2,m))/m;
    }
    console.log(accMul(10.111,1.1));