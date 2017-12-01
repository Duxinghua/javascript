 function clearzero(a){
    var old = new  String(a);  
    var newstr = old;  
    var leng = old.length - old.indexOf(".")-1;
    if(old.indexOf(".")>-1){  
        for(i=leng;i>0;i--){  
                if(newstr.lastIndexOf("0")>-1 && newstr.substr(newstr.length-1,1)==0){  
                    var k = newstr.lastIndexOf("0");  
                    if(newstr.charAt(k-1)=="."){  
                        return  newstr.substring(0,k-1);  
                    }else{ 
                        newstr = newstr.substring(0,k);  
                    }  
                }else{  
                    return newstr;  
                }  
            }  
        }  
        return old;  
} 
console.log(clearzero(0.1000111110000200));