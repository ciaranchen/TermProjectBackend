## 基本说明

所有POST请求都应以 `x-www-form-urlencoded` 方式编码

返回的响应皆为JSON数据，返回的状态保存在JSON数据的 `res` 段中。

### 错误信息

错误信息对照表

|响应码|msg|说明|
|:----- |:-------|:-----|
|405 |'no auth.' |用户未登陆 |
|405 |'no such a group.' | 无卡片组 或 用户无权限 |
|405 |'no enough params.' |参数不足 |
|500 |无 |请咨询管理员(是的真的BUG了) |

### 类型说明

#### Group记录

|属性名|类型|说明|
|:----- |:-------|----- |
|name |String | 卡片组名称 |
|owner |ObjectId | 卡片组所有者用户id |
|_id |ObjectId | 卡片组id |
|major |String | 卡片组分类 |

#### Card记录

|属性名|类型|说明|
|:----- |:-------|----- |
|group |ObjectId | 所属卡片组id |
|question |String | 问题 |
|answer |String | 答案 |

#### majorEnum

这个字段用来指定卡片组的分类，所有卡片组的类别应为其中之一。以下为所有可能的分类

> '英语', '数学', '历史', '政治', '编程', '法学', '物理', '天文', '经济学', '医学', '自动化', '生物学', '自然科学', '人文', '计算机'

## Users

### register(创建用户)

#### URL

> [http://localhost:3000/user/register](http://localhost:3000/user/register)

#### HTTP请求方式

> POST

#### 请求参数

|参数|类型|说明|
|:----- |:-------|----- |
|username |string | 用户名 |
|password |string | 密码 |
|email |string | 邮箱 |

#### 返回字段(JSON)

|属性名|类型|说明|
|:----- |:-------|----- |
|status |String | 状态 |

#### 接口示例

<!-- 
> 地址：[http://127.0.0.1:8080/http/user/login?username=ciaran&password=ciaran](http://127.0.0.1:8080/http/user/login?username=ciaran&password=ciaran)

    {status: 'OK'}
-->

> 无

### Login

#### URL

> [http://localhost:3000/user/login](http://localhost:3000/user/login)

#### HTTP请求方式

> POST

#### 请求参数

|参数|类型|说明|
|:------ |:-------|----- |
|password |string | 密码 |
|email |string | 邮箱 |

#### 返回字段(JSON)

|属性名|类型|说明|
|:----- |:-------|----- |
|status |String | 状态 |
|res | String | 用户名 |

Session:

|属性名|类型|说明|
|:----- |:-------|----- |
|user_id |ObjectId | 登录用户id |

#### 接口示例

> 无

### Logout

#### URL

> [http://localhost:3000/user/logout](http://localhost:3000/user/logout)

#### HTTP请求方式

> GET

#### 请求参数

无

#### 返回字段(JSON)

|属性名|类型|说明|
|:----- |:-------|----- |
|status |String | 状态 |

删除session

#### 接口示例

> 无

## Groups

本节下所有项目都需要用户登陆状态，即保有session.uid

### 新建卡片组

#### URL

> [http://localhost:3000/groups/create](http://localhost:3000/groups/create)

#### HTTP请求方式

> GET

#### 请求参数

|属性名|类型|说明|
|:----- |:-------|----- |
|name |String | 卡片组名称 |
|major |String | 卡片组分类。应为majorEnum中的一个。 |

#### 返回字段(JSON)

|属性名|类型|说明|
|:----- |:-------|----- |
|status |String | 状态 |
|res    |ObjectId | 卡片组id |

#### 接口示例

> 无

### getall

一个用户的所有卡片组信息。

#### URL

> [http://localhost:3000/groups/getall](http://localhost:3000/groups/getall)

#### HTTP请求方式

> GET

#### 请求参数

无

#### 返回字段(JSON)

|属性名|类型|说明|
|:----- |:-------|----- |
|status |String | 状态 |
|res    | Group 数组 | 卡片组数组 |

#### 接口示例

> 无

### delete

删除特定卡片组

#### URL

> [http://localhost:3000/groups/delete](http://localhost:3000/groups/getall)

#### HTTP请求方式

> GET

#### 请求参数

|属性名|类型|说明|
|:----- |:-------|----- |
|gid |ObjectId | 卡片组id |

#### 返回字段(JSON)

|属性名|类型|说明|
|:----- |:-------|----- |
|status |String | 状态 |
|res |ObjectId | 卡片组id |

#### 接口示例

> 无

### update

更改卡片组名称

#### URL

> [http://localhost:3000/groups/update](http://localhost:3000/groups/update)

#### HTTP请求方式

> GET

#### 请求参数

|属性名|类型|说明|
|:----- |:-------|----- |
|gid |ObjectId | 卡片组id |
|name |String | 新名称 |

#### 返回字段(JSON)

|属性名|类型|说明|
|:----- |:-------|----- |
|status |String | 状态 |

#### 接口示例

> 无

### import

从csv文件导入卡片组信息

#### URL

> [http://localhost:3000/groups/import](http://localhost:3000/groups/import)

#### HTTP请求方式

> POST

#### 请求参数

> post参数

|属性名|类型|说明|
|:----- |:-------|----- |
|name |String | 导入卡片组名称 |
|major |String | 导入卡片组分类。应为majorEnum中的一个。 |
|data |文件 | 数据文件 |

#### 返回字段(JSON)

|属性名|类型|说明|
|:----- |:-------|----- |
|status |String | 状态 |
|res |ObjectId | 新建的卡片组的id |

#### 接口示例

> 无

### export

导出卡片组信息到csv文件

#### URL

> [http://localhost:3000/groups/export](http://localhost:3000/groups/export)

#### HTTP请求方式

> GET

#### 请求参数

|属性名|类型|说明|
|:----- |:-------|----- |
|gid |ObjectId | 卡片组id |

#### 返回字段

直接下载文件

#### 接口示例

> 无

## Cards

此节下的所有接口都需要有：

- 用户登陆状态: seesion.uid
- url中的gid，即卡片组id。此卡片组的owner必须为当前登陆用户

> gid作为query参数进行传递,即使在Post请求中,也能解析到query参数

### query card

#### URL

> [http://localhost:3000/cards/](http://localhost:3000/cards/)

#### HTTP请求方式

> GET

#### 请求参数

无

#### 返回字段(JSON)

|属性名|类型|说明|
|:----- |:-------|----- |
|status |String | 状态 |
|res | Card 数组 | 卡片组中的所有卡片信息 |

#### 接口示例

> 无

### create

#### URL

> [http://localhost:3000/cards/create](http://localhost:3000/cards/create)

#### HTTP请求方式

> POST

#### 请求参数

Body:

|属性名|类型|说明|
|:----- |:-------|----- |
|question |String | 卡片正面内容 |
|answer |String | 卡片背面内容 |
|photo |文件 | 卡片背面图片（可选） |

#### 返回字段(JSON)

|属性名|类型|说明|
|:----- |:-------|----- |
|status |String | 状态 |
|res |ObjectId | 卡片对象id |

#### 接口示例

> 无

### update

#### URL

> [http://localhost:3000/cards/update](http://localhost:3000/cards/update)

#### HTTP请求方式

> POST

#### 请求参数

Body:

|属性名|类型|说明|
|:----- |:-------|----- |
|question |String | 卡片正面内容（可选） |
|answer |String | 卡片背面内容（可选） |
|photo |文件 | 卡片背面图片（可选） |

#### 返回字段(JSON)

|属性名|类型|说明|
|:----- |:-------|----- |
|status |String | 状态 |

#### 接口示例

> 无

