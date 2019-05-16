from scrapy.cmdline import execute
import os
import re
import sys

def executeSpider():

    cwd = os.getcwd()
    filepath = re.findall(r'(.+?)\\seprojext', cwd) # 获取项目文件绝对路径
    filedir = filepath[0]+"\\seprojext\\tutorial\\tutorial\\spiders"
    sys.path.append(filepath[0]+"\\seprojext\\tutorial\\tutorial")

    os.chdir(filedir)
    print(os.getcwd())
    execute("scrapy crawl cnn".split())

    # TODO 还是有问题，本来想调用的时候切换工作目录，但还是会有找不到包的问题

executeSpider()