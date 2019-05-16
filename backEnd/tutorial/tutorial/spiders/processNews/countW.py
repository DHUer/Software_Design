import re, collections
import json
from openpyxl import load_workbook
import os
import sys
sys.path.append("C:/Users/Administrator/Desktop/pyCrawler/scrapy/tutorial/tutorial/processNews")

cwd = os.getcwd()

# 统计文章单词数量并返回单词list
def readFile(file):
    
        # 统计词频
        with open (file, 'r') as f:
            words_box=[]
            for line in f:
                    line = line.lower()
                    if re.match(r'[a-zA-Z]*',line):#avoid chinese words influence
                             words_box.extend(line.strip().split())

        # 去重后的单词list
        w_list = list(collections.Counter(words_box))
        p = re.compile(r"[-!?',;.\"\']")

        # 清洗单词数据
        for index, ele in enumerate(w_list):

                clear_ele = p.sub('',str(ele))  # 去掉表单符号

                if(clear_ele == ''):    # 如果为空则删除
                        w_list.remove(ele)   
                else:
                        w_list[index] = clear_ele  
        
        # 统计单词总数，获取所有单词json数据
        with open(file, 'r') as f:
                w_raw_list = f.read().lower().split()

        print("文本单词总数为：" + str(len(w_raw_list)))
        print("文本去重后的单词总数为：" + str(len(w_list)))
                       
        return w_list, w_raw_list


# 读取词库文件，注意，单词为excel格式
# 并且，单词在第3列，下标[2]
def get_compare_lib(file, wlist):

        # 读取词库内容
        fp = load_workbook(file)
        sheet = fp.active

        word_lib = []
        for item in list(sheet.columns)[2]:
                word_lib.append(item.value)

        print("词库单词总数为：" + str(len(word_lib)))

        
        cover = 0
        for item in wlist:
                # print(item)
                if(item in word_lib):
                        cover = cover + 1

        return float(cover/len(wlist)) # 返回词汇覆盖比例


# text是文件所在位置，name是文章名
def main(text, name):
        news = text
        wordlist, w_raw_list= readFile(news)     #文本不重复单词列表，以及原始单词list

        w_raw_json = json.dumps(w_raw_list) # 将文章内容写入json并保存到同目录的news文件夹里
        with open(cwd+"\\news\\"+name+".json","w") as f:
                f.write(w_raw_json)

loca = cwd+"\\news\\ Why the Guineas, Oaks, Derby and St. Leger are known as the Classics.txt"



'''
难度计算办法，首先获得文本所有不同的单词
然后计算有多少属于词库
再计算比例
'''
