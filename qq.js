var async = require('async');
var qq_group = [{qq:"493077876"},{qq:"431191173"},{qq:"616697070"},{qq:"602675609"},{qq:"334102375"}];
//var command  = "curl -H 'Cookie: pgv_pvi=4336095232; RK=rWkLA3aubX; pac_uid=1_120426859; tvfe_boss_uuid=56ae5192a491eec5; luin=o0120426859; lskey=0001000026195fc459526356c622af75ce1c9edb333839b586dbf5dc4656fb2ad2c75d9e3741b5c390007795; o_cookie=120426859; eas_sid=21A5K0w9k3k7g498k9c5f586N9; pgv_pvid=7422364718; pgv_si=s833711104; ptisp=cnc; pgv_info=ssid=s5467358592; enc_uin=jo8C6flvoh7DfcO3uAY6ng; ptcz=09c2acd6e48f0837682a48f2c81b63d518202f5e7369397c43179920142b6ee9; uin=o0120426859; skey=@TsRB21q7p; pt2gguin=o0120426859; p_uin=o0120426859; pt4_token=S5Q1MYqt4SG5ptXVMRkKg2cxc0lj5qJABKnXWnNPWSI_; p_skey=daVjENA6fszCGKazBvE3jTdZnrU78rH*fODgKM34A8E_' -H 'content-type: application/x-www-form-urlencoded' -d 'gc=493077876&st=0&end=20&sort=0&key=%E6%A2%81%E6%A0%8B&bkn=1484479547' http://qun.qq.com/cgi-bin/qun_mgr/search_group_members";
var exec = require('child_process').exec; 
var flag = false;
console.log(async.eachSeries);
return;
function find(qq){
	var command  = "curl -H 'Cookie: pgv_pvi=4336095232; RK=rWkLA3aubX; pac_uid=1_120426859; tvfe_boss_uuid=56ae5192a491eec5; luin=o0120426859; lskey=0001000026195fc459526356c622af75ce1c9edb333839b586dbf5dc4656fb2ad2c75d9e3741b5c390007795; o_cookie=120426859; eas_sid=21A5K0w9k3k7g498k9c5f586N9; pgv_pvid=7422364718; pgv_si=s833711104; ptisp=cnc; pgv_info=ssid=s5467358592; enc_uin=jo8C6flvoh7DfcO3uAY6ng; ptcz=09c2acd6e48f0837682a48f2c81b63d518202f5e7369397c43179920142b6ee9; uin=o0120426859; skey=@TsRB21q7p; pt2gguin=o0120426859; p_uin=o0120426859; pt4_token=S5Q1MYqt4SG5ptXVMRkKg2cxc0lj5qJABKnXWnNPWSI_; p_skey=daVjENA6fszCGKazBvE3jTdZnrU78rH*fODgKM34A8E_' -H 'content-type: application/x-www-form-urlencoded' -d 'gc="+qq+"&st=0&end=20&sort=0&key=%E6%A2%81%E6%A0%8B&bkn=1484479547' http://qun.qq.com/cgi-bin/qun_mgr/search_group_members";
    					console.log("start...1");
					    	exec(command, function(err,stdout,stderr){
					    if(err) {
					        console.log('get weather api error:'+stderr);
					    } else {
					        var data = JSON.parse(stdout);
					        var ulength = data.search_count;
					        if(ulength > 1){
					        	flag = true;
					        }
					      //console.log("search_count":ulength);	
					      }
					      })				    }
					

}

async.eachSeries(qq_group, function(obj, callback) {  
	var qq = obj.qq;
  var command  = "curl -H 'Cookie: pgv_pvi=4336095232; RK=rWkLA3aubX; pac_uid=1_120426859; tvfe_boss_uuid=56ae5192a491eec5; luin=o0120426859; lskey=0001000026195fc459526356c622af75ce1c9edb333839b586dbf5dc4656fb2ad2c75d9e3741b5c390007795; o_cookie=120426859; eas_sid=21A5K0w9k3k7g498k9c5f586N9; pgv_pvid=7422364718; pgv_si=s833711104; ptisp=cnc; pgv_info=ssid=s5467358592; enc_uin=jo8C6flvoh7DfcO3uAY6ng; ptcz=09c2acd6e48f0837682a48f2c81b63d518202f5e7369397c43179920142b6ee9; uin=o0120426859; skey=@TsRB21q7p; pt2gguin=o0120426859; p_uin=o0120426859; pt4_token=S5Q1MYqt4SG5ptXVMRkKg2cxc0lj5qJABKnXWnNPWSI_; p_skey=daVjENA6fszCGKazBvE3jTdZnrU78rH*fODgKM34A8E_' -H 'content-type: application/x-www-form-urlencoded' -d 'gc="+qq+"&st=0&end=20&sort=0&key=%E6%A2%81%E6%A0%8B&bkn=1484479547' http://qun.qq.com/cgi-bin/qun_mgr/search_group_members";
    					console.log("start...1");
					    	exec(command, function(err,stdout,stderr){
					    if(err) {
					        console.log('get weather api error:'+stderr);
					    } else {
					        var data = JSON.parse(stdout);
					        var ulength = data.search_count;
					        if(ulength > 1){
					        	flag = true;
					        }
					      //console.log("search_count":ulength);	
					      }

					      })
					      callback();	
}, function(err){  
    if(flag){
    	console.log(11);
    }else{
    	console.log(22);
    }
});  

