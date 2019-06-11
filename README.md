Course Project of Software Engineering designed and implmented by Deng yangxiang, Cheng caiting and Wanglun cooperately. 


### 1 相关技术文档支持

* 微信小程序官方文档

  https://developers.weixin.qq.com/miniprogram/dev/index.html
  
* 一条龙服务repo

  https://github.com/justjavac/awesome-wechat-weapp
  
* 小程序登录、获取用户信息、openid和unionid详解

  https://www.daguanren.cc/post/wxlogin_getuserinfo_openid_unionid.html


* 保持登陆状态具体解决办法

  https://www.cnblogs.com/gdutzyh/p/7251432.html

  https://www.jianshu.com/p/2af0d2e9f375

  http://djangobook.py3k.cn/2.0/chapter14/
  
### 2 功能点

#### 2.1 主要功能点

* 测试词汇量
  * 利用现成的测试工具
  * 获取最后结果
  * 后台记录多次测试结果，做数据展示
* 根据词汇量推荐文章
  * 个性化，针对用户的词汇量/兴趣每天推荐一篇
  * 用户可以选择自己感兴趣的题材
* 根据类别/难度选择文章
  * 涉及对文章难度评级
  * 边爬边分类
* 生词本
  * 简单的温习方式（参考欧陆）
  * 记录词频（查过多少回）
  * 查词扒词典
* 爬取各大外国新闻网站文章
  * 一天爬一次
  * 数据存到服务器
  * 对文章进行一定的处理。将基本信息提取出来形成字段。
  * 重点是，看文章涵盖的词汇范围，可能说比较适合入门/初级/娴熟，或者预计花费时间。
* 推荐热门/多人在读/文章
  * 后台收集读者阅读数据
  * 直接在外文网站上扒热门的
* 轻触即可**取词翻译**

#### 2.2 次要功能点

* 收藏
* 已经看过多少词
* 统计阅读记录/浏览/
* 阅读榜

### 3 技术栈

#### 3.1 后端

* 后端服务器：Django 
* 数据爬取：Scrapy
* 数据库：sqlite

#### 3.2 前端

* Promise同步消息处理
* 

### 4 效果展示
![image](https://github.com/DHUer/Software_Design/blob/master/display-images/%E4%B8%BB%E9%98%85%E8%AF%BB%E7%95%8C%E9%9D%A2.gif) 

![image](https://github.com/DHUer/Software_Design/blob/master/display-images/%E5%8D%95%E8%AF%8D%E6%9C%AC.gif)

![image](https://github.com/DHUer/Software_Design/blob/master/display-images/%E6%94%B6%E8%97%8F%E6%96%87%E7%AB%A0.gif)

 ![image](https://github.com/DHUer/Software_Design/blob/master/display-images/%E8%83%8C%E5%8D%95%E8%AF%8D%E4%BF%A1%E6%81%AF.gif)

![image](https://github.com/DHUer/Software_Design/blob/master/display-images/%E8%AF%8D%E6%B1%87%E9%87%8F%E6%B5%8B%E8%AF%95.gif) 


