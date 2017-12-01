# iptables  配置
centos 初始化时没有/etc/sysconfig/iptables 时，没有配置过 进行保存可自动创建
iptables -I INPUT -p tcp --dropt 80 -j ACCEPT
service iptables save/start/stop/restart



