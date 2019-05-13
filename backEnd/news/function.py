'''
    在views部分用到的功能性函数全部放到这里~
    在views部分只编写接口函数
'''
import numpy as np


def hello():
    return "this is function~"

def top_n(dict, sample):

    for key in dict:
        dist = np.sqrt(np.sum(np.square(sample - dict[key]))) # sample是用户词汇覆盖度数据
        dict[key].append(dist) #将欧式距离加入每个文本的list，位置是最后一个，前7个都是覆盖度

    # print(dict.items())
    sort = sorted(dict.items(), key = lambda item:item[1][7], reverse = True) # 由大到小排列，返回的是list

    title = []
    for index, item in enumerate(sort):

        if index == 10:
            break

        title.append(item[0])

    return title # 返回文章标题