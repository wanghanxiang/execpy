# execpy
A simple js method to execute Python



#### 一、比较exec和spawn

> 1、`exec将子进程输出结果暂放在buffer中`，在`结果完全返回后`，再将输出`一次性的以回调函数返回`。如果exec的buffer体积设置的不够大，它将会以一个“maxBuffer exceeded”错误失败告终。而`spawn在子进程开始执行后`，就`不断的将数据从子进程返回给主进程`，它没有回调函数，它通过`流的方式`发数据传给主进程，从而实现了多进程之间的数据交换。这个功能的直接用应用场景就是“系统监控”。
>  2、书写上，exec更方便一些,将整个命令放在第一个参数中，而spqwn需要拆分。
>  `child_process.spawn('python', ['support.py', i])`
>  `child_process.exec('python support.py '+i, callback)`



#### 二、Python3出现 UnicodeEncodeError: ‘utf-8‘ codec can‘t encode characters 等其他编码问题

1、在linux系统下我们执行如下命令查看系统语言

```bash
echo $LANG
```

2、然后执行locale命令查看显示

```undefined
locale
```

如果显示下面的内容，代表当前的编码不支持utf-8.则配置语言存在问题

```
LANG=
LANGUAGE=
LC_CTYPE="POSIX"
LC_NUMERIC="POSIX"
LC_TIME="POSIX"
LC_COLLATE="POSIX"
LC_MONETARY="POSIX"
LC_MESSAGES="POSIX"
LC_PAPER="POSIX"
LC_NAME="POSIX"
LC_ADDRESS="POSIX"
LC_TELEPHONE="POSIX"
LC_MEASUREMENT="POSIX"
LC_IDENTIFICATION="POSIX"
LC_ALL=
```

3、检查一下当前系统是否存在utf8的语言包

```
[root@localhost ~]# locale -a |grep "zh_CN"
zh_CN
zh_CN.gb18030
zh_CN.gb2312
zh_CN.gbk
zh_CN.utf8
```

如果有上面几项则不用安装中文包，没有则需要安装中文包yum groupinstall chinese-support

4、修改语言配置

首先需要备份/etc/locale.conf，然后修改，再source一下 source /etc/locale.conf

也可以再/etc/locale.conf文件下修改LANG="zh_CN.UTF-8"。

```
[root@localhost ~]# cat /etc/locale.conf 
LANG=en_US.UTF-8

[root@localhost ~]# cp /etc/locale.conf /etc/locale.conf_bak

[root@localhost ~]# vim /etc/locale.conf # 修改后原英文错误信息会变成中文信息
LANG="zh_CN.GB18030"
LANGUAGE="zh_CN.GB18030:zh_CN.GB2312:zh_CN"
SUPPORTED="zh_CN.UTF-8:zh_CN:zh:en_US.UTF-8:en_US:en"
SYSFONT="lat0-sun16"
```

修改完后，我们需要检查一下语言配置.这两个命令查看。

```
locale
echo $LANGE
```

如果没生效，可以再打开环境变量配置文件

```
vim /etc/profile
```

在脚本上方输入下面命令

```
 export LANG=zh_CN.GBK
```

使立即生效

```
source /etc/profile
```

**注意（docker篇）：**

千万要记住，在docker中系统环境变量不生效哈~

```bash
/etc/profile
```

这个文件不生效，要将环境变量设置在才会生效

```
/root/.bashrc
```

执行如下临时修改：

```
export LANG=en_US.UTF-8
```

docker里面的永久修改：要的DockerFile里面增加如下来执行语言环境

```
ENV LANG zh_CN.UTF-8
```

