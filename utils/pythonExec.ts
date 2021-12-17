import { spawn, spawnSync, exec, execSync } from "child_process";
const fs = require('fs')
const os = require('os');
const path = require('path');
const PYTHON_CODE_BLOCK = path.resolve(__dirname, './basic.py');//执行代码块的路径

/**
 * @description 执行python方法
 * @param pythonPath python路径
 * @param params 参数
 * @param options 命令和类型
 * @returns 
 */
async function runPython(pythonPath: string, params: Array<string> = [], options: { command: string, type: string }) {
    const { command, type } = options;
    try {
        if (type === 'exec') {
            const files = pythonPath.split('/');
            const fileName = files[files.length - 1];
            pythonPath = pythonPath.replace(`/${fileName}`, '');
            try {
                const result = execSync(`cd ${pythonPath} && ${command} ${fileName} ` + params.join(' '), {
                    encoding: 'utf8'
                });
                return result;
            } catch (error) {
                throw error;
            }
        }

        if (type === 'spawn') {
            const spwanParmas = [pythonPath];
            if (params) {
                for (const param of params) {
                    spwanParmas.push(param);
                }
            }
            const { stdout, stderr } = spawnSync(command, spwanParmas, {
                encoding: 'utf8'
            });
            if (stdout) {
                return stdout;
            }
            if (stderr) {
                throw new Error(stderr);
            }
        }
    } catch (error) {
        throw error;
    }
}

/**
 * @description 直接运行def代码块方法
 * @param params 
 * @param options 
 * @returns 
 */
async function runPythonBycode(params: Array<string>, options: { command: string, type: string }) {
    const { type, command } = options;
    //basic.py是执行代码块的方法 接受三个 参数方法名、方法字符串、方法参数
    try {
        if (type === 'spawn') {
            const spwanParmas = [PYTHON_CODE_BLOCK];
            if (params) {
                for (const param of params) {
                    spwanParmas.push(param);
                }
            }
            console.info('spwanParmas', spwanParmas)
            const { stdout, stderr } = spawnSync(command, spwanParmas, {
                encoding: 'utf8'
            });
            if (stdout) {
                return stdout;
            }
            if (stderr) {
                throw new Error(stderr);
            }
        }
    } catch (error) {
        throw error;
    }
}

const _runByPath = async (path: any, params: Array<string> = [], options: any) => {
    try {
        return await _handleResult(path, params, options);
    } catch (error: any) {
        throw error;
    }
}

/**
 * @description 处理错误的方法
 * @param path 
 * @param params 
 * @param options 
 * @returns 
 */
async function _handleResult(path: string, params: any, options: any) {
    try {
        const result = await runPython(path, params, options);
        return result;
    } catch (error: any) {
        error.name = 'PythonExecError';
        error.message = error.message.replace(/File.+,.+line/, 'line').replace(/^Command failed[\s\S]*line/, 'line');
        throw error;
    }
}

/**
 * @description 处理错误的方法--执行代码块的
 * @param path 
 * @param params 
 * @param options 
 * @returns 
 */
async function _runPythonBycode(params: any, options: any) {
    try {
        const result = await runPythonBycode(params, options);
        return result;
    } catch (error: any) {
        error.name = 'PythonExecError';
        error.message = error.message.replace(/File.+,.+line/, 'line').replace(/^Command failed[\s\S]*line/, 'line');
        throw error;
    }
}


function _getFileName() {
    const timestamp = new Date().getTime() + '';
    const num = 4;
    const random = parseInt((Math.random() * 9 * Math.pow(10, num - 1)) + Math.pow(10, num - 1) + '')
    return timestamp.substring(timestamp.length - 6) + random;
}

/**
 * @description 直接执行python整个代码
 * @param text 
 * @param params 
 * @param options 
 * @returns 
 */
const _runByText = async (text: string, params: Array<string> = [], options: any) => {
    const fileName = _getFileName();
    const tmpPath = path.join(os.tmpdir(), `${fileName}.py`);
    fs.writeFileSync(tmpPath, text);
    try {
        return await _runByPath(tmpPath, params, options);
    } catch (error) {
        throw error;
    } finally {
        if (tmpPath) {
            //异步 删除缓存文件
            fs.unlink(tmpPath, function (err: any) {
                if (err) { console.log('文件:' + tmpPath + '删除失败！' + err); }
                console.log('文件:' + tmpPath + '删除成功！');
            });
        }
    }
}

const execByPath3 = async (path: string, params: Array<string> = []) => {
    return await _runByPath(path, params, { command: 'python3', type: 'exec' });
}

const execByText3 = async (text: string, params: Array<string> = []) => {
    return await _runByText(text, params, { command: 'python3', type: 'exec' });
}

const spawnByPath3 = async (path: string, params: Array<string> = []) => {
    return await _runByPath(path, params, { command: 'python3', type: 'spawn' });
}

const spawnByText3 = async (text: string, params: Array<string> = []) => {
    return await _runByText(text, params, { command: 'python3', type: 'spawn' });
}

/**
 * 
 * @param params 执行代码块的方法 接受三个 参数方法名、方法字符串、方法参数
 * @returns 
 */
const spawnByCodeBlock = async (params: Array<string>) => {
    return await _runPythonBycode(params, { command: 'python3', type: 'spawn' });
}


export {
    execByPath3,
    execByText3,
    spawnByPath3,
    spawnByText3,
    spawnByCodeBlock
};