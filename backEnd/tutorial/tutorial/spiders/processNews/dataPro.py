# from openpyxl import load_workbook
# import re
# import json
# import os
# def excelTocsv(filename):

#                 # 读取词库内容,默认单词在第三行
#                 fp = load_workbook(filename)
#                 sheet = fp.active

#                 word_lib = []
#                 for item in list(sheet.columns)[0]:
                    
#                     if(isinstance(item.value, str)):
#                         word = re.split('[\' \'.]',item.value)[0]
                    
#                         if(re.match(r"[a-zA-Z]+",word)):
#                                 word_lib.append(word)
#                                 print(word)

#                 with open('ielts.json','w') as f:
#                     json.dump(word_lib,f)

#                 print("词库单词总数为：" + str(len(word_lib)))



# def exceltocsv():
#                 rootpath = os.getcwd()+"\\lib"

#                 lib_list = os.listdir(rootpath)

#                 # 读取词库内容,默认单词在第三行
#                 for file in lib_list:
#                     if re.match("[a-z0-9]*.xlsx", file):
#                         print(file)

#                         fp = load_workbook(rootpath+"\\"+file)
#                         sheet = fp.active

#                         word_lib = []

#                         for item in list(sheet.columns)[2]:
#                             word = re.split(" ", str(item.value))[0]
#                             word_lib.append(word)

#                         name =re.findall(r'(.+?)\.',file)
                        
#                         with open(rootpath+"\\"+name[0]+".json",'w') as f:
#                             json.dump(word_lib, f)




# exceltocsv()

