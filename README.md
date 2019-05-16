# Software_Design
Course Project of Software Engineering


### 相关技术文档支持

* 微信小程序官方文档
  https://developers.weixin.qq.com/miniprogram/dev/index.html
  
* 一条龙服务repo
  https://github.com/justjavac/awesome-wechat-weapp
  
* 小程序登录、获取用户信息、openid和unionid详解
  https://www.daguanren.cc/post/wxlogin_getuserinfo_openid_unionid.html

* 保持登陆状态具体解决办法
  https://www.cnblogs.com/gdutzyh/p/7251432.html
  
  
### 功能点

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
    * 允许设置默认解释来源
* 爬取各大外国新闻网站文章
  * 一天爬一次
  * 数据存到服务器
  * 对文章进行一定的处理。将基本信息提取出来形成字段。
  * 重点是，看文章涵盖的词汇范围，可能说比较适合入门/初级/娴熟，或者预计花费时间。
* 推荐热门/多人在读/文章
  * 后台收集读者阅读数据
  * 直接在外文网站上扒热门的
* 点击**取词翻译**（有点难）

次要功能
* 评论/收藏/点赞
* 收藏
* 已经看过多少词
* 统计阅读记录/浏览/
* 阅读榜


