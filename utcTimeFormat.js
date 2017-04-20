    //格式化utc时间
    function utcToTimestamp(time){
        var timeArray = time.split("T");
        var y = timeArray[0].split("-")[0];
        var m = timeArray[0].split("-")[1];
        var d = timeArray[0].split("-")[2];
        var h = timeArray[1].split(".")[0].split(":")[0];
        var i = timeArray[1].split(".")[0].split(":")[1];
        var s = timeArray[1].split(".")[0].split(":")[2];
        var H =-(new Date().getTimezoneOffset()/60);
        if(parseInt(h)+parseInt(H) >= 24){
            d = parseInt(d)+1;
            h = (parseInt(H)+parseInt(h))%24;
        }else{
            h = parseInt(H)+parseInt(h);
        }
        return y+"-"+m+"-"+d+"    "+h+":"+i+":"+s;
    }