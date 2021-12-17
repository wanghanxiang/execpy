#!/usr/bin/bash python3
# -*- coding:utf-8 -*-
import sys


'''
合并两个字典
'''


def is_dict(dic):
    return isinstance(dic, dict)


def merge(dict_one, dict_two):
    if is_dict(dict_one) and is_dict(dict_two):
        return dict(dict_one, **dict_two)
    else:
        print("input param a:%s b:%s error"%(dict_one, dict_two))
        return {}


if __name__ == "__main__":
    a = {"a": 1, "b": 2}
    b = {"b": 3, "c": 4}
    print(merge(a, b))