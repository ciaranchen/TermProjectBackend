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

#### 返回字段(JSON)

|属性名|类型|说明|
|:----- |:-------|----- |
|status |String | 状态 |

删除session

#### 接口示例

> 无

## Groups


