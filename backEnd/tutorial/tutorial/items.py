# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

# Item 是保存爬取到的数据的容器；其使用方法和python字典类似
import scrapy


class TutorialItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    pass

class CnnItem(scrapy.Item):
    title = scrapy.Field()
    # link = scrapy.Field()
    content = scrapy.Field()
    author = scrapy.Field()
    update_time = scrapy.Field()
    url = scrapy.Field()
    types = scrapy.Field()
    pic = scrapy.Field()
    cover_rate = scrapy.Field()

