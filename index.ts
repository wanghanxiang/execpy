import { spawnByCodeBlock, spawnByPath3 } from "./utils/pythonExec";
const path = require('path');


let str_func = `
def mock(a,b,c): 
    print('====')
    return a+b+c
`;

//执行python代码块
(async () => {
    console.log('spawnByCodeBlock...');
    try {
        const params: Array<string> = [
            "mock",
            str_func,
            "1",
            "2",
            "3"
        ];
        let result = await spawnByCodeBlock(params);
        if (result) {
            let _t = result?.split(`\n`);
            result = _t[_t.length - 2]; //这里可能需要动态判断一下，如果最后一个为空，找前一个数组
        }
        console.log('result =>', result);
    } catch (error) {
        console.log('error =>', error);
    }
})();


//执行python 方法
(async () => {
    console.log('spawnByPath3...');
    try {
        const filePath = path.join(__dirname, './utils/simple_two.py');
        const result = await spawnByPath3(filePath);
        console.log('result =>', result);
    } catch (error) {
        console.log('error =>', error);
    }
})();

//执行python 方法. 可传入参数的
(async () => {
    console.log('spawnByPath3...');
    let a = JSON.stringify({ "a": 1, "b": 2 });
    let b = JSON.stringify({ "b": 3, "c": 4 });
    try {
        const filePath = path.join(__dirname, './utils/simple.py');
        const result = await spawnByPath3(filePath, [
            a,
            b
        ]);
        console.log('result =>', result);
    } catch (error) {
        console.log('error =>', error);
    }
})();
