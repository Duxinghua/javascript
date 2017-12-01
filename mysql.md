解决大数据
web服务器，只要有足够的服务就可以扩展。
数据库的扩展
如果没有稳定的数据库及服务器环境一切的一切全是空

影响数据库的因素
sql查询速度
服务器硬件,cpu,内存
网卡
磁盘io

超高的qps,tps
风险：效率低下的sql 大促 访问量增加，每处理一个sql的时间就很重要了，每一个sql只能用到一个cpu
qps:每秒中处理的查询量
10ms 处理 1个sql
1s 处理 100个sql
qps <= 100 1秒中来计算

100ms 处理 1个sql
qps <= 10

大量的并发和超高的cpu使用率
风险：
大量的并发：数据库连接数被占满(max_connections:默认为100,都需要增加)
超高的cpu使用率：因cpu资源耗尽而出现宕机
并发量：同一时刻数据库处理请求数据的数量
连接量：往往比并发量大，连接slip

磁盘io,数据库性能影响瓶劲之一
风险:磁盘io性能突然下降（使用更快的磁盘设备 ssd 磁盘控制器 radio 硬件解决）
其它大量消耗磁盘性能的计划任务（调整计划任务，做好磁盘维护）

网卡流量
风险：网卡io被占满（1000mb/8 = 100mb）
如何避免无法连接数据库的情况：
1减少从服务器的数量
2进行分级缓存
3避免使用select * 进行查询，浪费流量
4分离业务网络和服务器网络


还有什么会影响数据库性能
大表给我们带来的问题
（当一个表的数据超过千万行的时候，读取数据就会造成影响）
记录行数巨大，单表超过千万行
表数据文件巨大，表数据文件超过10G,这个得和具体的业务逻辑进行分析，根据磁盘io,比如只有一个人操作，比如数据量大了之后，要给这个表添加列，就很痛苦。比如数据要同步到多个表，如果这个文件超过10个g
大表对查询的影响
慢查询：很难在一定的时间内过滤出所需要的数据
比如一个表记录订单来源，数据上亿了，这个时间需要通过订单来源，知道是那个平台过来的订单
显示订单 来源少－－－区分度低－－－大量磁盘io－－－降低磁盘效率  大量的慢查询

大表对ddl操作的影响
修改表结构需要长时间锁表
风险：会造成长时间的主从延迟
影响正常的数据操作, 如果一个表的访问很频率很高，遇到数据库的连接数，增加，因为插入数据阻塞，表锁，排队

如何处理数据库中的大表
分库分表把一张大表分成多个小表
难点：
分表主键的选择
分表后跨分区数据的查询和统计


大表的历史数据归档 减少对前后端业务的影响
难点：
归档时间点的选择
如何进行归档操作

大事务来的问题
什么是事务
事务是数据库系统区别于其它一切文件系统的重要特性之一 比如一个文件在系统确保两个系统的一致性，如果在修改文件时，系统宕机之后，就很难保证文件一致性。而在数据库，使用了事务，可以恢复。
事务是一组具有原子性的sql语句，或是一个独立的工作单元 要么全部完成，要么全部失败。

事务 有原子性  一致性 隔离性  持久性  
事务的原子性ATOMICITY
一个事务必须被视为一个不可分割的最小工作单元，整个事务中的所有操作要么全部提交成功，要么全部失败，对于一个事务来说，不可能只执行其中的一部分操作
举个例子 
现在的银行是由多个账户，比如理财，存款账号
1.检查理财账户中的余额是否高于2000元
2.从理财账户的余额中减去2000元
3.在活动存款账户上增加2000元
这三步作为一个整体来完成。如果第二步，系统挂了，如果这三步在一个事务中完成。如果系统挂了，则会回滚。

整个事务中的所有操作要么全部提交成功，要么全部失败回滚

事务的一致性CONSISTENCY
一致性是指事务将数据库从一种一致性状态转换到另外一种一致性状态，在事务开始之前和事务结束后数据库中数据的完整性没有被破坏

事务的隔离性（isolation）
定义：隔离性要求一个事务对数据库中数据的修改，在未提交完成前对于其它事务是不可见的
sql标准中定义的四种隔离级别
隔离性由低到高 并发性是从由高到低
未提交读 read uncommited
已提交读 read commited
可重复读 repeatable read 默认
可串行化 serializable 带有锁


事务的持久性 durability
定义：一旦事务提交，则其所做的修改就会永久保存到数据库中。此时即使系统崩溃，已经提交的修改数据也不会丢失。


什么是大事务 定义：运行时间比较长，操作的数据比较多的事务 比如 余额宝 
风险：
锁定太多的数据，造成大量的阻塞和锁超时
回滚时所需时间比较长
执行时间长，容易造成主从延迟

如保处理大事务
1.避免一次处理太多的数据。
2.移出不必要在事务中的select 操作。



show variables like '%iso%'
设置事务set session tx_isolation='read-committed'



什么影响了性能
1.服务器硬件
cpu资源 内存大小 

硬盘io 网络 缓存失效时，就会导致占用网络资源

服务器硬件对性能的影响
如何选择cpu
cpu频率和数量
主频:2.5GHZ 核心数量18核36线程
我们的应用是cpu密集型的吗？
cpu密集型 加快sql查询速度，选择更好的cpu,而不是更多的cpu
目前的mysql 不支持多cpu对同一sql并发处理
mysql web类应用 并发量大 cpu的数量比频率重要

mysql 所使用的版本？
老版本的对cpu支持并不好 5.0之前的不好
新版本5.6以上能达到最好的性能


选择32位还是64位的cpu?
64位是默认，mysql完美的支持

注意:64位使用32位的服务器版本？
特别是云服务器上面的，公司自己的服务器
还有开发，测试，32位不能用于大于4g的内存，单线程服务


我们系统的并发量如何？提高系统的吞吐量？
这个时间需要多的cpu.
衡量数据库处理能力的指标：qps同时处理sql和数量 每秒钟处理sql的数量


内存的大小
数据 －－－－  内存 －－－－－  数据库 大大提高数据库的性能

常用的mysql存储引擎
myisam    
索引   －－－ 内存
数据   －－－ os（通过服务器进行缓存）

innodb
索引   －－－  内存
数据   －－－  内存
提示: 内存越多越好，但对性能影响有限，并不能无限无限的增加性能
比如数据库大小为100g,内存只有64g,这个时就需要增加内存了。
比如数据库大小为100g,内存200g,再扩展，提升性能也是有限的。
当然也不是绝对的，多余的内存增加操作系统其他服务的性能。


缓存对读也有益处，写也是的（对数据写入延缓，比如将多次写入变成一次写入）。
比如网页的访问计数器，将100次写入变成一次写入，提高了性能。数据库就提供了这个性能，比如多次写入一样的数据，一次写入到数据库。
磁盘 读取 内存cacahe 读取cpu
CPU  写入 内存 写入  磁盘。


如何配置内存？
内存的主频 选择最高，频率越高，读取速度就越快
主板应该支持频率最高的内存插槽

服务器内存
组成购买升级
每个通道的内存：相同的品牌、颗粒（相同的频率、电压、校验技术和型号）
选择的单条容量要尽可能大

当然也可能根据数据库大小选择内存

i/o子系统对数据库性能的影响？也就是硬盘？
有时可能需要牺牲内存，来提升i/o子系统的性能，数据最终都要实现在磁盘中存储

磁盘的配置和选择  
使用传统机器硬盘
最常用，价格低，存储空间大，读写较慢 ，使用最多
传统机器硬盘读取数据的过程（存储数据的密度）
1.移动磁头到磁盘表面上的正确位置
2.等待磁盘旋转，使用的所需的数据在磁头之下
3.等待磁盘旋转过去，所有所需的数据都被磁头读出

磁盘访问这些数据有多快，也就决定了访问数据的多快。
1.2.访问时间
3传输时间 速度

如何选择传统机器硬盘
1.存储空量
2.传输速度
3.访问时间
4.主轴转速
5.物理尺寸（越小，移动磁头距离小，快）

使用固态存储ssd和pcie卡

使用raid增加传统机器硬盘的性能
 什么是raid RAID 是磁盘冗余队列的简称 redundant arrays of independent disks 简单来说RAID的作用就是可以把多个容量较小的磁盘组成一组容量更大的磁盘，并提供数据冗余来保证数据完整的技术。
 raid 0 是最早出现的raid 模式，也称之为数据条带，是组建磁盘阵列中最简单的一种形式只需要2块以上硬盘即可，成本低，可以提高整个磁盘的性能和吞吐量，raid 0没有提供冗余或错误修复能力，但是实现成本是最低的。
 在raid 0中没有数据冗余，恢复成本高。备库或者一次性写入的数据。
 raid 1又称磁盘镜像，原理是把一个磁盘的数据镜像到另一个磁盘上，也就是说数据写入一块磁盘的同时会在另一块闲置上生成镜像文件，在不影响性能的情况下最大限度的保证系统的可靠性和可修复性。
 两块硬盘数据都是一样的。moirroring.
 可以通过软件实现raid0 raid1
 raid5 又称之为分布工奇偶校验磁盘阵列 通过分布式奇偶校验块把数据分散到多个磁盘上，这样如果作何一个盘数据失效，都可以从奇偶校验块中重建，但是如果两块磁盘失效，则整个卷的数据都无法恢复。分布式奇偶校验块来存取数据。
 raid5 是读为优势。
常用的raid组别 raid 10 分片的镜像 它是对磁盘先做raid1之后再对两组raid1磁盘再做raid 0,所以对读写都有良好的性能，相对于raid5重建起来更简单，速度也更快。

raid级别的选择
等级、特点、是否冗余、盘数、读、写
raid0、便宜，快速，危险、否、N、快、快
raid1、高速读，简单，安全、有、2、快，慢
raid5、安全，成本折中、有、n+1、快、取决于最慢的盘（注意磁盘坏了，之后的问题，磁盘i/o下降，延时，raid卡也有影响）
raid10、贵，高速，安全、有、2n、快、快（常用）

固态存储 ssd pci-e ssd (闪存Flash Memory)
相对于机械磁盘的特点
1.相对机械磁盘固态磁盘有更好的随机读写性能。
2.相对机械磁盘固态磁盘能更好的支持并发。
3.相对机械磁盘固态磁盘更容易损坏。

ssd特点
1.使用sata接口 可以替换传统磁盘而不需作何改变 sata 3.0 6gbps => sata 2.0 3gbps。
2.sata接口的ssd同样支持raid技术。选择支持ssd的raid

使用块景
适用于存在大量随机i/o的场景。
使用于解决单线程负载的i/o瓶颈。


pci-e ssd特点
1.无法使用sata接口 需要独特的驱动和配置。
2.价格相对于ssd要贵，但是性能比ssd更好。
3.需要使用服务器内存和cpu。







使用网络存储nas和san(两种外部文件存储设备加载到服务器上的方法)
Storage Area Network
san设备通过光纤连接到服务器，设备通过块接口访问，服务器可以将其当做硬盘使用。
大量顺序读写 读写i/o 缓存 i/o合并 
随机读写，慢 不如本地raid磁盘


Network Attached Storage
nas设备使用网络连接，通过基于文件的协议如nfs或smb来访问

网络存储适用的场景
不适用于存储mysql文件。
数据库备份
备注：网络对性能的影响

磁盘性能的限制 延迟 吞吐量
网络性能的限制 延迟 吞吐量（带宽）

网络带宽对性能的影响
 建议 
 采用高性能和高带宽的网络接口设备和交换机
 对多个网卡进行绑定，增加可用性和带宽
 尽可能的进行网络隔离



网络质量对性能影响

数据库服务器 web服务器 也是通过网络
例如：如果是天猫 双11.有50台web服务器 每台服务器 要获取2m的资源，这时就不够了

cpu
64位的cpu一定要工作在64位的系统下
对于并发比较高的场景cpu的数量比频率重要
对于cpu密集性场景和复杂sql则频率越高越好

内存
选择主板所能使用的最高频率的内存
内存的大小对性能很重要，所以尽可能的大


i/o子系统
pcie -> ssd -> Raid10 mysql
备份

2.服务器系统
mysql 适合的操作系统
windows 大小写不敏感  linux大小写敏感
freebsd
solaris
linux
centos

centos系统参数
内核相关参数/etc/sysctl.conf
net.core.somaxonn=65535 每个端口的最大
net.core.netdev_max_backlog=65535 充许最大的队列
net.ipv4.tcp_max_syn_backlog=65535 正在进行连接的队列

处理回收，大量的数据请求，如果占满就会造成数据库无法连接
net.ipv4.tcp_fin_timeout=10 处理tcp连接的等待时间
net.ipv4.tcp_tw_reuse=1
net.ipv4.tcp_tw_recycle=1
对于连接比较多的情况，等待况状，

决定tcp连接，接受和发送的最大值。缓冲区接收的最大值,对于数据库应用来说，应调整的比较大一点
net.core.wmem_default=87380
net.core.wmem_max=16777216
net.core.rmem_default=87380
net.core.rmem_max=16777216

用于减少失效连接占用tcp的资源，回收
net.ipv4.tcp_keepalive_time = 120
net.ipv4.tcp_keepalive_intvl = 30 
net.ipv4.tcp_keepalive_probes = 3


内存相关的参数
kernel.shmmax = 4294967295
linux内核参数中最重要的参数之一，用于定义单个共享内存段的最大值
注意:
1.这个参数应该设置的足够大，以便能在一个共享内存段下容纳下整个的innodb缓冲池的大小
2.这个值的大小对64位的linux系统，可取的最大值为物理内存-1byte,建议值为大于物理内存的一半，一般取值大大王土innodb缓着冲池的大小即可，可以取物理内存-1byte。

vm.swappiness = 0  这个参数当内存不足时会对性能产生比较明显的影响

linux系统内存交换区：
在linux系统安装时都会有一个特殊的磁盘分区，称之为系统交换分区。
如果我们使用free-m在系统中查看可以看到类似下面的内容其中swap就是交换分区。
当操作系统因为没有足够的内存时就会将一些虚拟内存写到磁盘的交换区中这样就会发生内存交换。 对mysql 服务器的性能有一定的影响。
在mysql服务器上是否要使用交换分区有一些争议：在mysql服务所在的linux系统上完全禁用交换分区。这样做带来的风险：
1.降低操作系统的性能。
2.容易造成内存溢出，崩溃，或者被操作系统kill掉。
结论:
在mysql服务器上保留交换区还是很有必要的但是要控制何时使用交换分区。
vm.swappiness = 0 
就是告诉linux内核除非虚拟内存完全满了，否则不要使用交换区。

增加资源限制(/etc/security/limit.conf)
这个文件实际上是linux pam也就是插入式认证模块的配置文件。
打开文件数的限制。
* soft nofile 65535
* hard nofile 65535
以上参数加入到limit.conf文件的未尾就可以了。
  ＊   表示对所有用户有效
  soft 指的是当前系统生效的设置
  hard 表明系统中所能设事实上的最大值
  nofile 表示所限制的资源是打开文件的最大数目
  65535 就是限制的数量
注意:这个文件的修改需要重启系统才可以生效。

磁盘性能的配置
磁盘调度策略(/sys/block/devname/queue/scheduler)
cat /sys/block/sda/queue/scheduler
noop anticipatory deadline [cfq] 桌面级可以
noop （电梯式调度策略） 实现了一个fifo队列，它像电梯的工作方式一样对i/o请求进行组织，当有一个新的请求到来时，它将请求合并到最近的请求之后，以此来保证请求同一介质。 noop段向饿死读而利于写，因此noop对于 闪存设备、ram及嵌入式系统是最好的选择

deadline截止时间调度策略 数据库应用是最好的选择
deadline确保了在一个截止时间内服务请求，这个截止时间是可调整的，而默认读期限短于写期限。
这样就防止了写操作因为不能被读取而饿死的现象，deadline对数据库类应用是最好的选择。

anticipatory(预料i/o调度策略)
本质上与Deadline一样，但在最后一次读操作后，要等6ms,才能继续进行对其它i/o请求进行调度。它会在每个6ms中插入新的i/o操作，而会将一些小写入流合并成一个大写入流，用写入延时换取最大的写入吞吐量。as适合于写入较多的环境，比如文件服务器，as对数据库环境表现很差。

更改方法
echo deadline > /sys/block/sda/queue/scheduler
echo <schedulername> > /sys/block/devname/queue/scheduler 
如 echo deadline > /sys/block/sda/queue/scheduler

文件系统对性能的影响
window fat ntfs
linux ext3 ext4 xfs
ext3/4 系统挂载参数 /etc/fstab
data = 
writeback 只有原数据写入到日志，数据写，不是同步 最快 innodb 最好
ordered 提供记录原数据，提供一致性的保证，写原数据之前，先写日志。出现事故，比较安全。
journal 写入数据记录在日志中

noatime,nodiratiome 禁止写入时间
/dev/sda1/ext4 noatime,nodiratime,data=writeback 1 1

3.数据库存储引擎的选择 插件式存储引擎

MyISAM:不支持事务，表级锁
InnoDB:事务级存储引擎，完美支持行级锁，事务ACID特性。

mysql 
客户端 连接服务端，在服务端都会启用一个线程
连接管理器 （查询缓存、查询解析、查询优化器等） mysql 服务层

select 语句：如何从文件中获取我们所要查询的数，这个具体实现方式下一层存储引擎层来实现

注意：存储引擎是针对于表的而不是针对于库的，一个库中的不同表可以使用不同表可以使用不同的存储引擎

MyISAM mysql5.5之前的默认存储引擎
系统表 临时表 （在排序、分组等操作中，当数量超过一定的大小之后，由查询优化器建立的临时表）
MyISAM 存储引擎表由MYD和MYI组成
数据文件 索引文件
＊.frm所有的存储文件都会有的，是一个存储表结构
特性：
并发性与锁级别（表级锁）读写并发性不好
表损坏修复 
check table tablename  检查
repair table tablename 恢复
create table myisam(id int,c1 varchar(10)) engine=myisam;

myisamchk --help 需要停止服务，如果不停止可能会损坏表数据
myisam表支持的索引类型 
myisam表支持数据压缩 myisampack
myisampack -b -f myisam.MYI  压缩之后的表只能进行读操作

限制
版本 < mysql5.0 时默认表大小为4g
如存储大表则要修改MAX_Rows和AVG_ROW_LENGTH,可能会需要重建。
版本 > mysql5.0默认支持为256TB

适用场景:非事务型应用 如没有财务需求  只读类应用 i/o不错   空间类应用 gps类数据

mysql 5.5.8之后的版本默认存储引擎就是 innodb
innodb使用表空间进行数据存储 处理大量的小事务
innodb_file_per_table 
on:独立表空间：tabname.ibd
off:系统表空间:ibdataX(X表示的是一个数字)
show variables like 'innodb_file_per_table';
create table myinnodb(id int,c1 varchar(10)) engine='innodb'
set global innodeb_file_per_table=off
系统表空间和独立表空间要如何选择
比较：
系统素空间无法简单的收缩文件大小 系统空间磁盘不足的情况怎么办？
独立表空间可以通过optimize table 命令收缩系统文件

系统表空间会产生io瓶劲
独立表空间可以同时向多个文件刷新数据

建议使用独立表空间，5.6之后都是独立的

把原来存在于系统表空间中的表转移到独立表空间中的方法
步骤：
1.使用mysqldump导出所有数据库表数据。
2.停止mysql服务，修改参数，并删除innodb相关文件。
3.重启mysql服务，重建innodb系统表空间。
4.重新导入数据。

innodb数据字典信息 undo回滚段 系统表空间

innodb存储引擎的特性
innodb是一种事务性存储引擎
完全支持事务的acid特性
redo log 和undo log 
show variables like 'innodb_log_buffer_size';
show variables like 'innodb_log_files_in_group'; 
redo log存储的是已提交的事务
undo log存信的是未提交的事务  随机读写 

innodb 支持行级锁
行级锁可以最大程度的支持并发
行级锁是由存储引擎层实现的
锁对数据库有性能的影响
什么是锁
锁的主要作用是管理共享资源的并发访问
锁用于实现事务的隔离性 
邮件的例子  如果有两个同时查看邮件 锁当一个用户在使用时，另一个用户是堵
锁的类型 共享锁 读锁  读锁与读锁之间兼容  独占锁 写锁

锁的粒度  加锁的最小单位 
表级锁  开销小 
show create table myinnodb;
lock table myinnodb write;
行级锁 开锁大 

阻塞
是因为不同锁之间的兼容性关系，在有些时刻一些事务中的锁需要等待另一个事务中的锁解开，所占用的一些资源，如果系统出现大量的阻塞？是否有问题？

死锁 
是两个事务或两个事务以上的锁，相互占用对方等待的资源，数据库中由系统自动处理。按照顺序来访问资源

innodb状态检查
show engine innodb status

适用场景
innodb适合于大多数oltp应用 5.7之后支持全文索引 空间函数


文件系统存储的特点 csv
普通的csv文件。
数据以文本方式存储在文件中。
.csv文件存储表内容。
.csm文件存储表的元素如表状态和数据量。
.frm文件存储表结构信息。

特点
1.以csv格式进行数据存储
2.所有列必须者是非空，不能为null
3.不支持索引
不适合大表，不适合在线处理
4.可以对数据文件直接编辑
保存文本文件内容

create table mycsv (id int not null ,c1 varchar(10) not null) engine = csv;
适用场景
适合做为数据交换的中间表

archive
特点:
1.以zlib对表数据进行压缩，磁盘i/o更少
2.数据存储在arz为后缀的文件中

功能特点:
1.只支持insert 和select 操作。有事务的特点。
2.只充许在自增id上加索引。

使用场景 日志和数据采集类应用

memory
特点:也称heap存储引擎，数据保存在内存中。 只有一个.frm文件。 i/o效率高很多。
功能特点：
1.支持hash索引和btree索引。等值查找前者，范围查找后者。
2.所有字段都为固定长度varchar(10)=char(10)。
3.不支持blog和text等大字段。
4.表级锁。
5.最大大小由max_heap_table_size参数决定，最大16M。已存在，大小，需要重建。

容易混淆的概念
memory存储引擎表 
临时表 系统使用临时表（超过限制使用myisam临时表 ，未超过使用memory）  create temporary table 建立的临时表

使用场景
用于查找或者是映射表，便如邮编和地区的对应表
用于保存存数据分析中产生的中间表
用于缓存周期性聚合数据的结果表
使用的memory生成的数据，一定是可以再生的。


federated
特点:
1.提供了访问远程mysql服务器上表的方法。
2.本地不存储数据，数据全部放到远程服务器上。
3.本地需要保存表结构和远程服务器连接信息。

如何使用？
默认禁止，启用需要在启动时增加federated参数
mysql://user_name[:password]@host_name[:port_num]/db_name/tbl_name
my.conf  federated=1
show engine;

配置好远程数据库
配置权限
grant select,update,insert,delete on remote.remoted_fed to fread_link@'127.0.0.1' identified by '123456'

在本地服务器创建和服务器上的表结构 ，engine = federated connection='mysql://fred_link:123456@127.0.0.1:3306/remote/remoted_fed';

就可以在本地操作了。本地操作会同步到远程服务器上面。

使用场景 
偶尔的统计分析及手工查询，检查业务逻辑。


如何选择存储引擎？
参考条件：事务  备份  崩溃恢复  存储引擎的特有特性 混合使用引擎，业务逻辑可能会出错





4.数据库参数配置 根据存储引擎的配置
mysql获取配置信息路径
命令行参数
mysqld_safe -- datadir=/data/sql_data

配置文件
不同的系统存储文件位置不一样
mysqld --help --verbose|grep -A 1 'Default options'
/etc/my.cnf
/etc/mysql/my.cnf
/home/mysql/my.cnf
~/.my.cnf

mysql 配置参数的作用域
全局参数
set grlobal 参数名＝参数值；
set @@global.参数名 ＝ 参数值；

会话参数
set [session]参数名 ＝ 参数值；
set @@session.参数名 := 参数值；

都在mysql客户端运行的。有的需要重新连接再会升效。
show variabled where variable_name='wait_timeout' or variable_name='interactive_timeout';

内存配置相关参数
确定可以使用的内存的上限
确定mysql的每个连接使用的内存
sort_buffer_size 缓存,排序在查询就分配。
join_buffer_size 每个连接缓存区的大小 
read_buffer_size 读表，缓存区的大小
大小一定要是4k的倍数
read_rnd_buffer_size 需要多少分配多少
以上四个参数是给每个线程分配的。如果配置过大，可能造成浪费


确定需要为操作系统保留多少内存  推荐给服务器专用服务器
如何为缓存池分配内存
innodb_buffer_pool_size 性能影响很大
总内存 －（每个线程所需要的内存＊连接数）-系统保留内存
kyc_buffer_size 用于myisam 系统表也是用的这个，也需要设置
select sum(index_length) from information_schema.tables where engine='myisam'

io配置项
innodb i/o相关配置 先写事务日志
innodb_log_file_size 单个事务大小 与事务有关
innodb_log_file_in_group 事务个数
事务日志总大小 = innodb_log_files_in_group* innodb_log_file_size
innodb_log_buffer_size  先写缓存
innodb_flush_log_at_trx_commit
0:每秒进行一次log写入cache并flush log到磁盘
1:默认：在每次事务提交执行log写入cache,并flush log到磁盘
2:建义：每次事务提交，执行log数据写入到cache,每秒执行一次flush log到磁盘

innodb_flush_method = O_DIRECT 通知操作不要缓存，都通过存储设备完成
innodb_file_per_table = 1 控制innodb使用表空间，
innodb_file_doublewrite =1 双写缓存，增加数据的安全性。防止数据没有写完。

myisam io配置 
delay_key_write 关键字缓存
off:每次写操作后刷新键缓冲中的脏块到磁盘。
on:只对在键表时指定了delay_key_write选项的表使用延迟刷新。
all:对所有myisam表都使用延迟键写入


安全相关配置
expire_logs_days指定自动清理binlog的天数 防止二进程日志占用的空间
max_allowed_packet 控制mysql可以接收包的大小 ，主从复制大小最好一致
skip_name_resolve 禁用dns查找，验证时关闭。
sysdate_in_now 确保sysdate()近回确定性日期。
read_only 禁止非super权限的用户写权限 主从数据？
skip_slave_start 禁用slave 自动恢复
sql_mode 设置mysql所使用的sql模式
strict_trans_tables 非事务无影响
no_engine_subtituion
no_zero_date 
no_zero_in_date 日期限制
only_full_group_by 



其它常用配置参数
sync_binlog 控制mysql 如何向磁盘刷新binlog 主从服务器？
tmp_table_size max_heap_table_size 控制内存临时表大小，小，不要过大，不然内存溢出
max_connections 控制允许的最大连接数

sql结构与sql语句优化是重点
数据库设计对性能的影响
1.过会的反范式化为表建立太多的列
2.过会的范式化造成太多的表关联 规定是61,但最好是10个
3.在otp环境中使用不恰当的分区表？？？
4.使用外键保证数据的完整性


5.数据库结构设计和SQL语句 慢查询 等
性能优化顺序 
1.数护库结构设计和sql语句
2.数据库存储引擎和参数配置
3.系统选择及优化
4.硬件升级。





测量系统性能 优化是否起作用 mysql基准测试
什么是基准测试
基准测试是一种测量和评估软件性能指标的活动用于建立某个时刻的性能基准，以便当系统发生软硬件变化时重新进行基准测试以评估变化对性能的影响

基准测试是针对系统设置的一种压力测试

基准测试 直接 简单 易于比较，用于评估服务器的处理能力
压力测试 对真实的业务数据进行测试，获取真实系统所能承受的压力
压力测试需要针对不同主题，所使用的数据和查询也是真实用到的
基准测试可能不关民业务逻辑，所使用的查询和业务的真实性可以和业务环境没关系

mysql基准测试的目的
建立mysql服务器的性能基准线确定当前mysql服务器运行情况
摸拟比当前系统更高的负戴以找出系统的扩展瓶劲 增加数据库并发，观察qps,tps变化，确定并发量与性能最优的关系。
测试不同的硬件、软件和操作系统配置。
证明新的硬件设备是否配置正确。

对整个系统进行基准测试 
从系统入口进行测试（如网站web前端，手机app前端）
优点:
能够测试整个系统的性能，包括web服务器缓存、数据库等。
能反映出系统中各个组件接口间的性能问题，体现真实性能状况。
缺点：
测试设计香杂，消耗时间长


单独对mysql进行基准测试 
优点：
测试设计简单，所需耗费时间短
缺点：
无法全面了解整个系统的性能基线

衡量mysql 的吞吐量
单位时间内所处理的事务数tps
单位时间内所处理的查询数qps

完成一个任务所需的时间
响应时间
平均响应时间，最小响应时间，最大响应时间，各时间所占百分比
并发量：同时处理的查询请求的数量 并发量不等于连接数 正在工作中的并发的操作数或同时工作的数量

基准测试步骤：
计划和设计基准测试
对整个系统还是某个组件
使用什么样的数据
准备基准测试及数据收集脚本
cpu使用率、io、网络流量、状态与计数器信息等
保存及分析基准测试结果

基准测试中容易忽略的问题？
使用生产环境数据时只使用了部分数据 推荐 使用数据库完全备份来测试
在多用户场景中，只做单用户的测试
在单服务器上测试分布式应用 推荐：使用相同架构进行测试
反复执行同一查询 容易缓存命中，无法反映真实的测试


基准测试

mysqlslap 随mysql一起安装的
特点:
可以摸拟服务器负载，并输出相关统计信息
可以指定也可以自动生成查询语句，可以设置并发数

常用参数说明
--auto-generate-sql 由系统自动生成sql脚本进行测试
--auto-generate-sql-add-autoincrement 在生成的表中增加自增ID
--auto-generate-sql-load-type 指定测试中使用的查询类型 读写更删
--auto-generate-sql-write-number 指定初始化数据时生成的数据量
--concurrency 指定并发线程的数量
--engine 指定要测试表的存储引擎，可以用逗号分割多个存储引擎
--no-drop 指定不清理测试数据 可能会影响多次影响
--iterations 指定测试运行的次数
--number-of-queries 指定每一个线程执行的查询数量 影响线程的建立和断开
--debug-info 指定输出额外的内存及cpu统计信息
--number-int-cols 指定测试表中包含的int类型列的数量
--number-char-cols 指定测试表中包含的varchar类型的数量
--create-schema 指定了用于执行测试的数据库的名字
--query 用于指定自定义sql的脚本
--only-print 并不运行测试脚本，而是把生成的脚本打印出来


mysqlslap --concurrent=1,50,100,200 --interations=3 -number-int-cols=5 --number-char-cols=5 --auto-generate-sql --auto-generate-sql-add-autoincrement --engine=myisam,innodb --number-of-queres =10 --create-schema=sbtest --only-print

mysql基准测试工作之sysbench 多线程，影响服务器性能 cpu,io等  测试接近innodb
安装说明
https://github.com/akopytov/sysbench/archive/0.5.zip
unzip sysbech-0.5.zip
cd sysbech
./autogen.sh
./configure --with-mysql-includes = /usr/local/mysql/include/ \ --with-mysql-libs=/usr/local/mysql/lib/ 指定安装目录
make && make install

常用参数
--test 用于指定所要执行的测试类型，支持以下参数 
Fileio 文件系统i/o性能测试
cpu cpu性能测试
memory 内存性能测试
Oltp 测试要指定具体的lua脚本
Lua脚本位于sysbench-0.5/sysbech/tests/db

--myql-db 用于指定执行基准测试的数据库名
--mysql-table-engine 用于指定所使用的存储引擎
--oltp-tables-count 执行测试的表的数量
--oltp-table-size 指定每个表中的数据行数
--num-threads 指定测试的并发线程数量
--max-time 指定最大的测试时间
--report-interval 指定间bgkmqq长时间输出一次统计信息
--mysql-user 指定执行测试的mysql用户
--mysql-password 指定执行测试的mysql用户的密码
prepare 用于准备测试数据
run 用于实际进行测试
cleanup 用于清理测试数据

sysbench --test=cpu --cpu-max-prime=10000 run
free -m
df -lh 查看相对应的使用容量
sysbench --test=fileio --file-total-size=1G prepare 
sysbench --test=fileio --num-threads=8 --init-rng=on --file-total-size=1g --file-test-mode=rndrw --report-interval=1 run 
比如新硬件添加，需要进行测试 
create database imooc;
grant all privileges on *.*  to sbest@'localhost' identified by '123456';
cd /home/imooc/sysbench-0.5/sysbench/
cd test/db
sysbench --test=./oltp.lua --mysql-table-engine=innodb --oltp-table-size=10000 --mysql-db=imooc --mysql-user=sfbest --mysql-password=123456 -oltp-tables-count=10 --mysql-socket=/usr/local/mysql/data/mysql.sock prepare 

show processlist;mysql 正在运行的命令
./analyze.sh 收集的日志文件名

数据库结构
良好的数据库逻辑设计和牧师设计是数据库获得高性能的基础
设计的时候，不能只考虑目前的逻辑，还有将来的查询
加快一些语句查询速度   反范式化设计  影响其他语句的影响
数据库结构优化的目的
1.减少数据冗余
2.尽量避名数据维护中出现更新，插入和删除异常

插入异常：
如果表中的某个实体随着另一个实体而存在（就是在插入表时，只插入两个字段，其它字段不知道，可其它的字段不能为空）
更新异常：
如果更改表中的某个实体的单独属性时，需要对多行进行更新。（数据冗余多，更新一个属性，会影响其它的数据）
删除异常：
如果删除表中的某一实体则会导致其他实体的消失。（比如删除一个属性，就会导致表中的记录也被删除）

节约数据存储空间
提高查询效率

数据库结构设计的步骤：
需求分析：
全面了解产品设计的存储需求
存储需求
数据处理需求
数据的安全性和完整性

逻辑设计：
设计数据逻辑存储结构
数据实体之间的逻辑关系，解决数据冗余和数据维护异常
物理设计:
跟据所使用的数据库特点进行表结构设计
关系型数据库:oralce,sqlserver,mysql,postgressql
非关系型数据库:mongo,Redis,hadoop
存储引擎:innodb

维护优化：
跟据实际情况对索引、存储结构等进行优化


数据库设计范式
设计出没有数据冗余和数据维护异常的数据结构

数据库三范式 考虑实际的业务情况
数据库设计的第一范式的特点：
1.数据库表中的所有字段都只具有单一属性。
2.单一属性的列是由基本的数据类型所构成的。
3.设计出来的表都是简单的二维表。
数据库设计的第二范式的特点：
要求一个表中只具有一个业务主键，也就是说符合第二范式的表中不能存在非主键列对只对部分主健的依赖关系 不满足，的就是拆分多个表。
数据库设计的第三范式的特点：
指每一个非主属性即不部分依赖于也不传递依赖于业务主键，也就是在第二范式的基础上消除了非主属性对主健的传递依赖。


需求说明
按下面的需求设计一个电子商务网站的数据库结构
1.本网站只销售图书类商品
2.需要具有以下功能
用户登陆
用户登陆及用户管理功能
1.用户必须注册并登陆系统才能进行网上交易用户名保持惟一。
2.同一时间一个用户只能在一个地方登陆。
3.用户信息（用户名 主键，密码，手机号，注册日期，在线状态，出生日期）
只有一个业务主键，一定是符合第二范式没有属性和业务主键存在传递依赖的关系，符合第三范式

商品展示及商品管理功能
商品信息｛商品名称，分类名称，出版社名称，图书价格，图书描述，作者｝
拆分
商品信息：｛商品名称，出版社名称，图书价格，图书描述，作者｝
分类信息：｛分类名称，分类描述｝
商品分类：｛对应关系表｝｛商品名称，分类名称｝

商品展示
供应商管理

供应商信息：｛出版社名称，地址，电话，联系人，银行账号｝
用户管理
商品管理
在线销售
核心
在线销售：｛订单编号，下单用户名，下单日期，订单金额，订单商品分类，订单商品名，订单商口单价，订单数量，支付金额，物流单号｝
1.只有一个业务主键，符合第二范式。
2.订单商品单价，订单商品数量，订单编号存在着传递依赖关系，不符合第三范式。
3.数据冗余＝》订单商品信息和商品信息表中的数据。

折分
订单表：｛订单编号，下单用户名，下单日期，支付金额，物流单号｝
订单商品关联表：｛订单编号，订单商品分类，订单商品名，商品数量｝

编写sql查询出每一个用户的订单总金额
select 下单用户名，sum(d.商品价格*b.商品数量) from 订单表 a
join 订单商品关联表 b on a.订单编号 = b.订单编号 
join 商品分类关系表  c on c.商品名称 ＝ b.商品乐称 and
c.分类名称 = b.订单商品分类 join 商品信息表 d on d.商品名称 ＝ c.商品名称  group by 下单用户名   
对于mysql来说关联表，越多，性能越差  如果价格有变化，所有的都会变化，需要知道当时的价格。存在问题

假设下单用户就是商品的收货人，我们在发货前一定要查询出每个订单的下单人信息，而这些信息全部记录在用户信息表中
编写sql查询出下单用户和订单详情
select a.订单编号，e.用户名，e.手机号，d.商品名称，c.商品数量，d.商品价格
from 订单表 a join 订单商品关联表 b on a.订单编号 =b.订单编号 join 商品分类关联表 c on c.商品名称 = b.商品名称 and c.分类名称 = b.订单商品分类 join 商品信息表 d on d.商品名称 = c.商品名称 join 用户信息表 e on e.用户名 = a.下单用户名

完全符合范式化的设计有时并不能得到良好的sql查询性能

什么叫做反范式化设计
反范式化是针对范式化而言，在前面介绍了数据库设计的范式，所谓的反范式化就是为了性能和读取效率的考虑而适当的对数据库设计范式的要求进行违反，而允许存在少量的数据冗余，换句话来说反范式化就是使用空间来换取时间。

图书在线销售网站数据库的反范式化改造
商品信息:{商品名称，出版社名称，图书价格，图书描述，作者}
分类信息:{分类名称，分类描述}
商品分类关系系表:{商品名称，分类名称}

修改后
商品信息表:{商品名称，分类名称，出版社名称，图书价格，图书描述，作者}
分类信息:{分类名称，分类描述}

图书在线销售网站数据库的反范式化改造
订单表:{订单编号，下单用户名，下单日期，支付金额，物流单号}
订单商品关联表:{订单编号，订单商品分类，订单商品名，商品数量}

修改
订单表:{订单编号，下单用户名，手机号，下单日期，支付金额，物流单号，订单金额}
订单商品关联表:{订单编号，订单商品分类，订单商品名商品数量，商品单价}

反范式化改造后的查询
编写sql查询出每一个用户的订单总金额
select 下单用户名，sum(订单金额) from 订单表  group by 下单用户名；

编写sql查询出下单用户和订单详情
select a.订单编号，a.用户名，a.手机号，b.商品名称，b.商品单价,b.商品数量 from 订单表 a join 订单商品关联表 b on a.订单编号 = b.订单编号


范式化设计的优缺点
优点:
1.可以尽量的减少数据冗余
2.范式化的更新操作比反范式更新快
3.范式化的表通常比反范式化更小

缺点:
1.对于查询需要对多个表进行关联
2.更难进行索引优化


反范式化设计的优缺点
优点：
1.可以减少表的关联
2.可以更好的进行索引优化


缺点:
1.存在数据冗余及数据维护异常
2.对数据的修改需要更多的成本


物理设计
根据所选择的关系型数据库的特点对逻辑模型进行存储结构设计
物理设计涉及的内容：
1.定义数据库，表及字段的命名规范 
a.数据库、表及字段的命名要遵守可读性原则
b.数据库、表及字段的命名要遵守表意性原则
c.数据库、表及字段的命名要遵守长名原则

2.选择合适的存储引擎
存储引擎，事务，锁粒度，主要应用，忌用
MyISAM,不支持，支持并发插入的表级锁，select,insert,读写操作频繁
MRG_MYISAM,不支持，支持并发插入表级锁，分段归档，数据仓库，全局查找过多的场景
innodb,支持，支持MVCC的行级锁，事务处理，无
archive,不支持，行级锁，日志记录，只支持insert、select,需要随机读取、更新、删除
Ndb cluster,支持,行级锁,高可用性，大部份应用

3.为表中的字段选择合适的数据类型
当一个列可以选择多种数据类型时，应该优先考虑数字类型，其次是日期或二进制类型，最后是字符类型。对于相同级别的数据类型，应该优先选择占用空间小的数据类型
字符串处理比数字慢
如何选择正确的整数类型 tinyint smallint mediumint int bigint
如何选择正确的实数类型 float double （非精确的值）｜decimal（精确的值，最多存储65个字节）
如何选择varchar 和char类型 （以字符为单位）
1.varchar用于存储变长字符串，只占用必要的存储空间
2.列的最大长度小于255则只占用一个额外字节用于记录字符串长度
3.列的最大长度大于255则要占用两个额外字节用于记录字符串长度
varchar长度的选择问题 5.7之前改长度时会锁表 在内存中，处理字符串的长度是固定的
1.使用最小的符合需求的长度
2.varchar(5)和varchar(200)存储mysql字符串性能不同
varchar的适用场景
1.字符串列的最大长度比平均长度大很多。
2.字符串列很少被更新。
3.使用了多字节字符集存储字符串。

char类型的存储特点
1.char类型是定长的
2.字符中存储在char类型的列中会删除未尾的空格
3.最大宽度255
char类型的适用场景
1.char类型适合存储的长度近似的值。md5的值。
2.char类型适合存储短字符串。
3.char类型适合存储经常更新的字符串列。（必免产生碎片）


如何存储日期数据
DATATIME类型 以YYYY-MM-DD HH:MM:SS[.FRACTION]格式存储日期时间
datetime = YYYY-MM-DD HH:MM:SS
datetime(6) = YYYY-MM-DD HH:MM:SS.fraction
DATATIME类型与时区无关，占用8个字节的存储空间

TIMESTAMP类型 存储的时间戳 和时区有关系
存储了由格林尼治时间1970年1月1日到当前时间的秒数以YYYY-MM-DD HH:MM:SS[.fraction]的格式显示，占用4个字节 时间范围1970-01-01 到2038-01-19
显示依赖于所指定的时区
在行的数据修改时可以自动修改timestamp列的值

set time zone='+10:00';
create table t(id int,d1 datetime,d2 timestamp not null ,d3 timestamp not null);
date类型和time类型 5.7之后
存储用户生日时
1.把日期部分存储为字符串（至少要8个字）
2.使用int类型来存储（至少4个字节）
3.使用datetime类型来存储（8个字节）

date类型的优点
1.占用的字节数比使用字符串、datetime 、int存储要少，使用date类型只需要3个字节
2.使用date类型还可以得用日期时间函数进行日期之间的计算
3.date类型用于保存1000-01-01到9999-12-31之间的日期

time类型用于存储时间数据，格式为HH:MM:SS
存储日期时间数据的注意事项
1.不要使用字符串类型来存储日期时间数据。
日期时间类型通常比字符串占用的存储空间小
日期时间类型在进行查找过滤时可以利用日期来进行对比
日期时间类型还有首丰富的处理函数，可以方便的对日期类型进行日期计算

2.使用int存储日期时间不如使用timestamp类型

物理设计  存储空间 存储引擎 数据类型 
innodb 为表中的每个列选择合适的类型 
如何选择表的主键
主键应该尽可能的小
主键应该是顺序增加的 增加数据的插入效率
innodb的主键和业务主键可以不同
4.建立数据库结构


如何从数据库架构方面优化数据库

维护和优化放到索引和sql优化部分讲解

数据库索引优化
索引告诉数据库如何快速的找到数据。
索引：
在表中除了主健外没有作何的索引
在表中每一列都建立索引

在正确的列中建立正确的索引才能提高索引
mysql支持的索引类型
1.B-tree索引的特点 innodb指向的是主键，myisam指向的是内存
a.以B+树的结构存储数据
2.B-tree索引能够加快数据的查询速度，不需要全表扫描
3.B-tree索引更适合进行范围查找
4.顺序存储
在什么情况下可以用到b树索引
a.全值匹配的查询 order_sn = '98765432119900'
b.匹配最左前缀的查询 根据订单日期
c.匹配列前缀查询 order_sn like '9876%'
 匹配范围值的查询
 order_sn > '98765432119'
 and order_sn < '98765432999'
d.精确匹配左前列并范围匹配另外一列
e.只访问索引的查询
order by 会用到 group by 

Btree索引的使用限制
1.如果不是按照索引最左列开始查询，则无法使用索引
2.使用索引时不能跳过索引中的列 如果是联合过引，必须都在
3.Not in和<>操作无法使用索引
4.如果查询中有某个列的范围查询，则其右边所有列都无法使用索引

Hash索引的特点 innodb自适应
1.Hash索引是基于Hash表实现的，只有查询条件精确匹配，hash索引中的所有列时，才能够使用到hash索引（等值查询）
2.对于Hash索引中的所有列，存储引擎都会为每一行计算一个Hash码，Hash索引中存储的就是hash码

hash索引的限制
1.hash索引必须进行二次查找。
2.hash索引无法用于排序。
3.hash索引不支持部分索引查找也不支持范围查找。
4.hash索引中hash码的计算可能存在hash冲突。

 为什么要使用索引 innodb  的存储是以页为单位，一页是16k
1.索引大小减少了存储引擎需要扫描的数据量
2.索引可以帮助我们进行排序以避免使用临时表
3.索引可以把随机i/o变为顺序i/o

索引是不是越多越好？
索引会增加写操作的成本
太多的索引会增加查询优化器的选择时间

安装演示数据库
步骤
http://downloads.mysql.com/docs/sakila-db.tar.gz 
tar -zxf sakila-db.tar.gz 
mysql -u root -p < sakila-schema.sql
mysql -u root -p < sakila-data.sql

索引优化策略
索引列上不能使用表达式或函数
select .... from product where to_days(out_date) - to_days(current_date) < = 30

select .... from product where out_date <= date_add(current_date,interval 30 day)
前缀索引和索引列的选择性
(有这么一种情况：字段属性字节很大，比如text，如果在此列上面建索引会导致很慢) index 726 255 如果大于，myisam 1000 取的字符串的一部份
create index index_name on table(col_name(n)); 
索引的选择性是不重复的索引值和表的记录数的比值

联合索引
如何选择索引列的顺序？
1.经常会被使用到的列优先。放到最左边
2.选择性高的列优先，选择性高，过滤快
3.宽度小的列优先

覆盖索引
mysql 可以利用索引返回select 列表中的字段，而不必根据索引再次读取数据文件。包含所有满足查询需要的数据的索引

优点：
可以优化缓存，减少磁盘io操作。
可以减少随机io,变随机io操作变为顺序io操作。
可以避免对innodb主健索引的二次查询。
可以避免myisam表过行系统调用。


无法使用覆盖索引的情况
1.存储引擎不支持覆病历索引
2.查询中使用了太多的列
3.使用了双%号的like查询

explain select language_id from film where language_id = 1\G;
extra:using index说明可以使用索引可以查找
explain select * from film where language_id =1\G;
extra:using where 高版本的可能没有这个

使用索引来优化查询
使用索引扫描来优化排序
通过提成序操作
按照索引顺序扫描数据
1.索引的列顺序和order by 子句的顺序完全一致
2.索引中所有列的方向升序降序和order by子句完全一致
3.order by中的字段全部在关联表中的第一张表中
explain select * from rental where rental_date='2005-05-09' order by inventory_id,customer_id\G;

模拟hash索引
alter table film add title_md5 varchar(32);
update file set title_md5=md5(title);
create index index_md5 on film(title_md5);

explain select * from film where title md5=md5('EGG ICBY') and title="EGG ICBY" \G;


摸拟Hash索引优化查询
只能处理键值的全值匹配查找
所使用hash函数决定着索引键的大小

利用索引优化锁
索引可以减少锁定的行数
索引可以加快处理速度，同时也加快了锁的释放

drop index index_actor_last_name on actor;
explain select * from actor where last_name ='wood' \G;

begin;
select * from actor;
rollback;
mysql 允许在一个列上建立多个索引  

















