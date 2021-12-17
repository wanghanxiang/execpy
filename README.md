# execpy
A simple js method to execute Python



#### 比较exec和spawn

> 1、`exec将子进程输出结果暂放在buffer中`，在`结果完全返回后`，再将输出`一次性的以回调函数返回`。如果exec的buffer体积设置的不够大，它将会以一个“maxBuffer exceeded”错误失败告终。而`spawn在子进程开始执行后`，就`不断的将数据从子进程返回给主进程`，它没有回调函数，它通过`流的方式`发数据传给主进程，从而实现了多进程之间的数据交换。这个功能的直接用应用场景就是“系统监控”。
>  2、书写上，exec更方便一些,将整个命令放在第一个参数中，而spqwn需要拆分。
>  `child_process.spawn('python', ['support.py', i])`
>  `child_process.exec('python support.py '+i, callback)`
