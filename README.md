# TermProjectBackend

后端实现

## 使用方法：

安装mongodb。

#### 安装node依赖

> npm install

#### 启动数据库

将当前目录 data/data 文件夹 作为数据存储目录
将当前目录 data/data.log 作为数据库日志存储

> # Windows:
> .\sqlScripts\start_mongodb.bat

> # *nix:
> ./sqlScripts/start_mongodb.sh

#### 启动项目

> npm start

## api文档

参见 `api.md`

## For test

> npm i mocha -g
> npm test
