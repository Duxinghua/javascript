  //人民币格式化
    Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
        places = !isNaN(places = Math.abs(places)) ? places : 2;
        symbol = symbol !== undefined ? symbol : "";
        thousand = thousand || ",";
        decimal = decimal || ".";
        var number = this,
            negative = number < 0 ? "-" : "",
            i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
    };

    console.log(100000.01.formatMoney())
   
      //金额格式化
    $(document).on("keyup",".iptPrice",function(nodeType){
        var number = nodeType.target.value.split('.');
        if(number.length > 1){
            nodeType.target.value = number[0].replace(/\D/g, '') + '.'+number[1].replace(/\D/g,'') ;
        }else{
            nodeType.target.value = number[0].replace(/\D/g,'');
        }
    })
