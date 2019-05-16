from django.urls import path

from . import  views

urlpatterns = [
    # TODO 此处添加映射的url地址
    path('test/',views.test),
    path('get_brief/',views.get_article_info),
    path('get_detail/',views.get_article)

]