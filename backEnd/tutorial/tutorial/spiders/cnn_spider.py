# -- coding: utf-8 --
import scrapy
from tutorial.items import CnnItem
from scrapy import Request
import os 
import sys 
import json
import re,collections
sys.path.append(os.getcwd())


cwd = os.getcwd() # 获取当前工作目录

class CnnSpider(scrapy.spiders.Spider):
    name = "cnn" #用于区别Spider
    # allowed_domains = ["dmoz.org"]

    # 包含了Spider在启动时进行爬取的url列表。 
    # 因此，第一个被获取到的页面将是其中之一。
    # 后续的URL则从初始的URL获取到的数据中提取
    start_urls = [
        "https://edition.cnn.com"
    ]

    def parse(self, response):

        for sel in response.xpath('//div[@class=\'nav-menu-links\']/a'):

            # 这里获取了每个类别的url
            cate_url = sel.xpath('@href').extract()[0]
            cate_url = "https://edition.cnn.com"+cate_url

            yield Request(url = cate_url, callback = self.get_cate_list)

            break

            

            
    def get_cate_list(self, response):

        for sel in response.xpath('//h3[@class=\'cd__headline\']/a[contains(@href,\'html\')]'):

            news_url = "https://edition.cnn.com" + sel.xpath('@href').extract()[0]

            yield Request(url = news_url, callback = self.get_news_content)

            

    def get_news_content(self, response):

        item = CnnItem()

        # 标题
        item['title'] = response.xpath("//h1[@class=\'pg-headline\']/text()").extract()[0]
        
        # 内容，这里是list形式
        content = response.xpath('//div[contains(@class,\'zn-body__paragraph\')]/text()').extract()

        # 发布时间
        item['update_time'] = response.xpath('//p[@class=\'update-time\']/text()').extract()[0]

        # 作者
        item['author'] = response.xpath('//span[@class=\'metadata__byline__author\']/text()').extract()[0]

        # 网址
        item['url'] = response.url

        # 文章类别
        item['types'] = response.xpath('//div[contains(@class,\'nav-section__name\')]/a/text()').extract()[0]

        # TODO 文章图片url，还存在一点问题
        # item['pic'] = response.xpath("//div[@class='l-container']/img/@data-src-small").extract()[0]


        # 文章存放位置
        article_dir = cwd+"\\res\\news"

        if (not os.path.exists(article_dir)): # 目录不存在则创建
            os.makedirs(article_dir)

        content_list = [] # 存放每段文本
        for para in content:
            content_list.append(para.split())

        filename = article_dir+"\\"+item['title']+".json"

        with open(filename , 'w') as f:
            f.write(json.dumps(content_list)) # 写入文件

        item['content'] = filename
        item['cover_rate'] = get_cover_rate(item['title'], content) # 获取覆盖率，是一个dict

        yield item




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

# scrapy crawl cnn -o items.json 可以存数据到json格式

# TODO 试试这个网址的办法！https://stackoverflow.com/questions/13437402/how-to-run-scrapy-from-within-a-python-script