#!/usr/bin/bash python3
# -*- coding:utf-8 -*-
# 执行代码块的python基类方法
# 需要提前引用一些传进来的方法的代码块

import sys

def exec_str_func(func_name, func_str, func_params):
  # 转换字典临时保存
  func_convert_dic = {}
  func_exec = compile(func_str, '<string>', 'exec')
  
  exec(func_exec, func_convert_dic)

  # 传参（暂时先支持固定参数）
  result_need = func_convert_dic[func_name](*func_params)
  print("***{}".format(result_need))

if __name__ == "__main__":
  #func_name = "mock"
  #func_str = "def mock(a): \
  #              return a"
  #func_params = "ssssss"

  func_name = sys.argv[1] #方法名
  func_str = sys.argv[2] #方法的字符串
  func_params = sys.argv[3:] #参数
  exec_str_func(func_name, func_str, func_params)
