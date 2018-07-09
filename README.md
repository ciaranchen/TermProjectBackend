# XDU Web Engineering Term Project Backend

XDU web工程大作业后端实现

## 使用方法：

首先需要安装mongodb。

#### 安装node依赖

```shell
npm install
```

#### 启动数据库

将当前目录 data/data 文件夹 作为数据存储目录
将当前目录 data/data.log 作为数据库日志存储

##### Windows:

```shell
.\sqlScripts\start_mongodb.bat
```

##### *nix:

```shell
./sqlScripts/start_mongodb.sh
```

#### 启动项目

```shell
npm start
```

## API 文档

参见 `api.md`

## For test

```shell
npm i mocha -g
npm test
```

##### for Windows：

```shell
npm i mocha -g
.\tests\start_tests.bat
```

