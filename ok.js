var memcache = require('./memcacheHandler.js');
function tick(flag){
var r = require('request');
var cache = require('memory-cache');

    var url = 'https://www.okcoin.cn/api/v1/depth.do?symbol=btc_cny';

    var options = {
        url: url,
        headers: {
            
        },
        form:{
        size:10,
        merge:1
        }
    };
    r.get(options,function(err,data){
        if(err){
            console.log(1111);
            return;

        }
        var string = JSON.parse(data.body);
        var asks = string.asks;
        var bids = string.bids;
       // console.log(1111);
        console.log(string);
        return;
        var b_amount = 0,a_amount = 0,sum_a_amount = 0,sum_b_amount = 0;
        var b_vol = 0,a_vol = 0;

        for(var i = 0;i<bids.length;i++){
        	console.log(bids[i]);
            b_amount += bids[i][0]*100;
        	b_vol += bids[i][1]*100000000;
            
            sum_a_amount += (bids[i][0]*100)*(bids[i][1]*100000000);
            if(b_vol >= flag*100000000){
                break;
            } 
        }
        var b_avg = sum_a_amount/b_vol/100;
        //console.log(sum_a_amount/b_vol/100);
        cache.put("b_avg",b_avg);
        memcache.setValue('m_b_avg',b_avg,60);


        for(var j = 0;j<asks.length;j++){
        	console.log(asks[j]);
        	a_amount += asks[j][0]*100;
        	a_vol += asks[j][1]*100000000;
            sum_b_amount += (asks[j][0]*100)*(asks[j][1]*100000000);
            if(a_vol >= flag*100000000){
                break;
            }

        }
        var a_avg = sum_b_amount/a_vol/100;
        //console.log((sum_b_amount/a_vol/100))
        cache.put("a_avg",a_avg);
        memcache.setValue('m_a_avg',a_avg,60);
        //console.log(cache.get("b_avg"));
        //console.log(cache.get("a_avg"));
        console.log("memcache");
        memcache.getValue('m_a_avg',function(error,data){
            console.log(data);
        });
        memcache.getValue('m_b_avg',function(error,data){
            console.log(data);
        });

    });
}
tick(2);

CFLAGS=-I/usr/local/opt/libxml2/include/libxml2 LDFLAGS=-L/usr/local/opt/libxml2/lib  pip install -r requirements.txt