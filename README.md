# h5-designer ![](https://img.shields.io/github/package-json/v/huangwenxia/h5-designer)

![](https://img.shields.io/github/package-json/dependency-version/huangwenxia/h5-designer/vue)
![](https://img.shields.io/github/package-json/dependency-version/huangwenxia/h5-designer/ant-design-vue)
![](https://img.shields.io/github/package-json/dependency-version/huangwenxia/h5-designer/vue-router)
![](https://img.shields.io/github/package-json/dependency-version/huangwenxia/h5-designer/vuex)


## 简介

本项目是基于vue3+typescript技术开发，使用了vue-router+vuex等插件，项目选择的UI框架是ant-design-vue。本项目主要用于自定义编排含文本、图片、视频等富文本的H5页面，并且有丰富的动画效果。项目包含nodejs服务端、web前端，前后端分离的模式。还有比较完整的原型、api文档，非常适合作为练手项目，无论前端还是全栈都适用。



## 相关链接

[预览体验](http://h5.tucy.top/)

[接口API文档](https://tuchongyang.github.io/h5-designer-server)

[后端仓库地址](https://tuchongyang.github.io/h5-designer-server)


## 功能模块

>首页场景列表

>场景详情展示

>场景装修

>>页面、图层（文本、图片、视频）、动画、音乐
   
>>预览、保存、发布
   
>个人中心

>>我的场景列表
   
>>素材管理（图片、视频、音乐）
   
>>营销统计
   
>>个人资料

## 快速开始

```
git clone https://github.com/huangwenxia/h5-designer

cd h5-designer

npm install

npm run serve
```

## 部署

执行`npm run build`后，将dist目录复制到服务器上，例如``

配置nginx，以下是我的配置，修改对应的路径即可

```
server {
        listen       80;
        server_name  h5.tucy.top;

        location / {
            root   /root/tcy/h5-designer/dist;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html;
        }
        location /show {
            alias   /root/tcy/h5-designer/dist;
            index show.html;
        }

        location /public {
            alias   /root/tcy/h5-designer-server/app/public;
        }
        location /api {
            proxy_set_header            Host $host;

            proxy_set_header            X-real-ip $remote_addr;

            proxy_set_header            X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass   http://127.0.0.1:7010/api;
        }
    }

```

## 开发计划与进度

V1.0

| 功能 | 进度 |
| ------ | ------ |
| 首页 | 已完成 |
| 个人中心-我的场景 | 已完成 |
| 个人中心-个人资料 | 已完成 |
| 个人中心-素材-图片 | 已完成 |
| 个人中心-素材-视频 | 待开发 |
| 个人中心-素材-音乐 | 待开发 |
| 个人中心-营销统计 | 待开发 |
| 装修-页面 | 已完成 |
| 装修-图层 | 待开发 |
| 装修-文本 | 已完成 |
| 装修-图片 | 已完成 |
| 装修-视频 | 待开发 |
| 装修-音乐 | 待开发 |


## 反馈与交流

1、欢迎star，你的支持，就是我们的动力。

2、发现问题请前往issues反馈。

3、也可以加入我们的交流群，qq群：145679486
