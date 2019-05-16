# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html

import MySQLdb
import MySQLdb.cursors
import json
import codecs
import os
import sys
import re
class TutorialPipeline(object):
    def process_item(self, item, spider):
        return item


class CnnPipeline(object):

    # open db
    def open_spider(self, spider):
        db = spider.settings.get('MYSQL_DB_NAME', 'se_projext')
        host = spider.settings.get('MYSQL_HOST', '62.234.84.248')
        port = spider.settings.get('MYSQL_PORT', 3306)
        user = spider.settings.get('MYSQL_USER', 'user')
        passwd = spider.settings.get('MYSQL_PASSWORD', 'projext2019')

        self.db_conn =MySQLdb.connect(host=host, port=port, db=db, user=user, passwd=passwd, charset='utf8')
        self.db_cur = self.db_conn.cursor()

    # close db
    def close_spider(self, spider):
        self.db_conn.commit()
        self.db_conn.close()

    # process data
    def process_item(self, item, spider):
        self.insert_db(item)
        return item

    # insert data
    def insert_db(self, item):
        values = (
            item['title'],
            item['author'],
            item['update_time'],
            item['url'],
            item['content'],
            item['types']            
        )

        sql = 'INSERT INTO article(title,author,update_time,url,content,types) VALUES(%s,%s,%s,%s,%s,%s)'
        print(sql)
        self.db_cur.execute(sql, values)

class JsonPipeline(object):
    def __init__(self):

        cwd = os.getcwd() # 获取当前工作目录
        filepath = re.findall(r'(.+?)\\seprojext', cwd) # 获取项目绝对路径
        filepath = filepath[0] + "\\seprojext\\res"
        
        if (not os.path.exists(filepath)):
            os.makedirs(filepath)

        self.file = codecs.open(filepath+"\\news.json", 'w') # , encoding='utf-8'这个参数暂时不用，因为读取的时候会报错

    def process_item(self, item, spider):
        line = json.dumps(dict(item), ensure_ascii=False) + "\n"
        
        self.file.write(line)

        return item

    def spider_closed(self, spider):
        self.file.close()