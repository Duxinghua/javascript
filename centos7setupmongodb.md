1.vim /etc/yum.repos.d/mongodb.repo

[mongodb]
name=MongoDB Repository
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64/
gpgcheck=0
enabled=1

2.yum -y update
  yum -y install mongodb-org mongodb-org-server


3.systemctl start mongod

查看状态
systemctl status mongod
状态统计汇总表（连续）
mongostat

5行，每2秒总结一次
mongostat --rowcount 5 2

mongo 默认查找mongodb服务器监听端口27017
mongo --port 2222

关闭mongodb
systemctl stop mongod

比特派 v2.2.5 发布，优化了多重签名服务，如果在进行交易时，买方取消了订单，买方会被扣除押金补偿给卖家。

在比特派上进行多重签名服务交易，方便快捷，加电报群： @bitpie1
