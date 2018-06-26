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
|500|无|请咨询管理员(是的真的BUG了) |

## Users

### register(创建用户)

#### URL

> [http://localhost:3000/user/register](http://localhost:3000/user/register)

#### HTTP请求方式

> POST

#### 请求参数

|参数|必选|类型|说明|
|:----- |:-------|:-----|----- |
|username |true |string | 用户名 |
|password |ture |string | 密码 |
|email |ture |string | 邮箱 |

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

|参数|必选|类型|说明|
|:----- |:-------|:-----|----- |
|password |ture |string | 密码 |
|email |ture |string | 邮箱 |

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

query

|属性名|类型|说明|
|:----- |:-------|----- |
|name |String | 卡片组名称 |

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
|res    | Group | 卡片组信息数组 |

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

## Cards

此节下的所有接口都需要有：

- 用户登陆状态: seesion.uid
- url中的gid，即卡片组id。此卡片组的owner必须为当前登陆用户

### query card

#### URL

> [http://localhost:3000/cards/<:gid>](http://localhost:3000/cards/<:gid>)

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

> [http://localhost:3000/cards/<:gid>/create](http://localhost:3000/cards/<:gid>/create)

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

> [http://localhost:3000/cards/<:gid>/update](http://localhost:3000/cards/<:gid>/update)

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

