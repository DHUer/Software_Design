# import csv
# import json
# from sklearn.cluster import KMeans
# import numpy as np
# import pandas as pd
# import matplotlib.pyplot as plt

# '''
# read_csv_file(filename):首先读取csv覆盖率信息，返回以title为key值，以覆盖率为value的字典

# top_n(dict):然后利用欧式距离，获取最相似的10个文章的title,返回list

# get_article_info(newsList):获取文章基本信息，对数据库进行操作，返回json格式
# '''

# def read_csv_file(filename):
#     with open(filename) as csvfile:
#         data = csv.reader(csvfile, delimiter=',')

#         # arr = np.empty()
#         tmp = []
#         dic = {}  # key:文章名 value:覆盖率
#         for index,row in enumerate(data):
            
#             if not row:
#                 continue

#             dic[row[0]] = [float(row[i]) for i in range(1,len(row))]
#             # row = [float(row[i]) for i in range(1,len(row))]
#             # tmp.append(row)

#         return dic # 返回字典

# def visualize(data):

#     # 可视化前两行数据
#     plt.scatter(data[:,0],data[:,2], s=50)

#     plt.show()

# def kmeans(filename):

#     data = pd.read_csv(filename)
#     data = data.ix[:,1:]

#     kmeans = KMeans(n_clusters = 3, random_state=10).fit(data)

#     data['labels'] = kmeans.labels_
#     data_count_type = data.groupby('labels').apply(np.size)

#     print(data_count_type)

#     # TODO 还得接着扒 参考这里：https://www.cnblogs.com/yjd_hycf_space/p/7094005.html


# def getArticle(indexList, filename):

#     title = []

#     with open(filename, 'r') as f:
#         data = csv.reader(filename, delimiter=',')

#         for i in indexList:
#             title.append(data[i][0])

#     return title

# def top_n(dict, sample):

#     for key in dict:
#         dist = np.sqrt(np.sum(np.square(sample - dict[key]))) # sample是用户词汇覆盖度数据
#         dict[key].append(dist) #将欧式距离加入每个文本的list，位置是最后一个，前7个都是覆盖度

#     # print(dict.items())
#     sort = sorted(dict.items(), key = lambda item:item[1][7], reverse = True) # 由大到小排列，返回的是list

#     title = []
#     for index, item in enumerate(sort):

#         if index == 10:
#             break

#         title.append(item[0])

#     return title # 返回文章标题

# def main(sample):

#     filename = "覆盖率.csv"
#     dict = read_csv_file(filename)

#     top_n(dict, sample)


# # 模拟一个用户的样本
# sample = np.asarray([0.3,0.55,0.63,0.85,0.72,0.14,0.33])
# main(sample)


# def get_top_n(sample):
#     return True


