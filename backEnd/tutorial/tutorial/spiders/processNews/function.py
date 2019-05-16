import re, collections
import json
from openpyxl import load_workbook
import os
import csv

# 获取当前工作目录
cwd = os.getcwd()

# 处理文章内容存入json文件
def to_json(para_list):

        content = []

        for para in para_list:
                para_split = para.split() # 对每行进行单词分割
                content.append(para_split)
        
        return content # 返回一个包含每段单词的list




# 获取所有词库的覆盖比例
def get_cover_rate(title, para_list):

        cover_rate_list = [] # 用于存放所有词库的覆盖率
        cover_rate_list.append(title)

        # 统计词频
        words_box = []
        for para in para_list:

                para = para.lower()

                if re.match(r'[a-zA-Z]*', para):

                        words_box.extend(para.strip().split())

        # 去重后的单词w_list
        w_list = list(collections.Counter(words_box))
        p = re.compile(r"[-!?',;.\"\']")

        # 清洗单词数据
        for index, ele in enumerate(w_list):

                clear_ele = p.sub('',str(ele))  # 去掉表单符号

                if(clear_ele == ''):    # 如果为空则删除
                        w_list.remove(ele)   
                else:
                        w_list[index] = clear_ele    

        # 这里获取词库路径下所有文件，读取内容进行覆盖度统计
        cover_dict = {}
        # cover_dict['name'] = title

        lib_path = cwd+"\\processNews\\lib"
        lib_list = os.listdir(lib_path)

        print("获取所有词库...")

        for lib_name in lib_list:

                # 获取词库名
                name =re.findall(r'(.+?)\.',str(lib_name))[0]
                
                print("正在读取 "+name+"的内容...")


                # 读取词库内容
                with open(lib_path+"\\"+lib_name, 'r') as f:
                        word_lib = json.load(f)

                print("词库单词总数为：" + str(len(word_lib)))

                cover = 0
                for item in w_list:
                        # print(item)
                        if(item in word_lib):
                                cover = cover + 1

                cover_rate_list.append(cover/len(w_list))

                cover_dict[name] = cover/len(w_list)

        # with open(cwd+"\\res\\覆盖率.csv",'a') as f:
        #         # 创建writer对象
        #         writer = csv.writer(f)
                        
        #         # 写入参数
        #         writer.writerow(cover_rate_list)

        # with open(cwd+"\\res\\覆盖率.json",'a') as f:
        #         json.dump(cover_dict, f)

        return cover_dict # 返回的是字典，key：对应词库名 value：对应覆盖率

        
        

def test():
        return "success"
