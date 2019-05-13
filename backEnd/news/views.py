import numpy as np
import sys
import os
import re
import json
sys.path.append(os.path.dirname(os.getcwd()))
from django.shortcuts import render
from scrapy.cmdline import execute 
from django.http import HttpResponse
from news.function import *

cwd = os.getcwd()

# Create your views here.

def test():
    print(hello())

def get_content(filepath): # 根据文章路径读取内容

    with open(filepath, 'r') as f:
        data = json.load(f) # 直接读出来就是list        
 
    return data # 返回文章中所有单词list


def get_article_info(request): # 返回所有文章基本信息不包含内容

    # 工作目录在root下和manage.py同级,然后res也在root下
    dirname = os.path.dirname(cwd)
    
    datapath = dirname + "\\seprojext\\res\\news.json"

    articles = []
    with open(datapath, 'r') as f:
        while True:
            line = f.readline()
            if not line:
                break

            # print(line)
            data = json.loads(line)
            articles.append(data)
            # print(data)

    return HttpResponse(json.dumps(articles), content_type="application/json") # 返回所有文章的基本信息

def get_article(request): # 获取文章所有信息加内容

    # 工作目录在root下和manage.py同级,然后res也在root下
    dirname = os.path.dirname(cwd)
    datapath = dirname + "\\seprojext\\res\\news.json"

    article = []
    with open(datapath, 'r') as f:
        while True:
            line = f.readline()
            if not line:
                break
            
            data = json.loads(line)
            filepath = data['content'] # 获取文章内容所在位置
            data['content'] = get_content(filepath) # 获取文章内容
            print(data['content'])

            article.append(data)

    return HttpResponse(json.dumps(article), content_type="application/json")

# TODO 获取读者词汇掌握程度，推荐难度最适合的文章
def get_similiar(request, paramList): # 推荐难度最合适的10篇文章，参数是读者的词汇覆盖比率

    return True


# TODO 按不同难度返回文章




# filepath = "F:\\seprojext\\tutorial\\tutorial\\spiders\\res\\news\\5 questions about Iran's nuclear deal announcement.json"
# get_content(filepath)

test()