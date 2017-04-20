    //cookie检测
    function CookieEnable(){
        var result=false;
        if(navigator.cookieEnabled)return true;
        document.cookie = "testcookie=yes;";
        var cookieSet = document.cookie;
        if (cookieSet.indexOf("testcookie=yes") > -1){
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            document.cookie = 'testcookie' + "=" + '' + "; expires=" + exp.toGMTString();//删除测试cookie
            result=true;
        }
        return result;
    }