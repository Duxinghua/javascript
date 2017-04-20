    //格式化银行卡格式
    function formatBankNo(banknumber){
        var length = banknumber.length;
        var newbanknumber = "";
        if(length > 4){
            var size = parseInt(length/4);
            for (var i = 0; i < size; i++) {
                var start = i*4;
                var end = (i+1)*4;
                if((i+1)*4 > length){
                    end = length;
                }
                var str = banknumber.substring(start,end);
                newbanknumber += str+" ";
            };
            if(length%4 != 0){
                newbanknumber += banknumber.substring(size*4,length);
            }else{
                var endstr = newbanknumber.substring(newbanknumber.length-1,newbanknumber.length);
                if(endstr == " "){
                    newbanknumber = newbanknumber.substring(0,newbanknumber.length-1);
                }
            }
        }else{
            return banknumber;
        }
        return newbanknumber;
    }