# api

目前开放的api有2个大类，分别是：`event`和`utils`。

全部开放在网页审查工具的`window.HatsuneMiku`对象下。

## event

### send

```typescript
window.HatsuneMiku.event.send(eventName);
```

|参数名称|参数类型|说明|是否必需|备注|
|----|----|----|----|----|
|eventName|string|发送的事件名称|是|因为只是对原生事件函数的再封装，所以注意不能和已有的事件名称重复。|

|返回值名称|返回值类型|说明|
|----|----|----|----|----|

### receive

该函数一般与`send`搭配使用。

返回值类型：`void`

```typescript
window.HatsuneMiku.event.receive(eventName, callback, once);
```

|参数名称|参数类型|说明|是否必需|备注|
|----|----|----|----|----|
|eventName|string|监听的事件名称|是||
|callback|Function|回调函数|是||
|once|boolean|是否为一次性监听|否|默认为`false`，若为`true`，则在触发一次后删除该监听。|

|返回值名称|返回值类型|说明|
|----|----|----|----|----|

## utils

内含4小类，分别为：`icon`、`storage`、`common`和`ui`。

### icon

#### createBarIcon

在输入框上方的图标栏中添加图标。

```typescript
window.HatsuneMiku.utils.icon.createBarIcon(icon, onclick);
```

|参数名称|参数类型|说明|是否必需|备注|
|----|----|----|----|----|
|icon|string|图标名称|是|在[此处](https://www.mdui.org/zh-cn/docs/2/libraries/icons#search)搜索图标名称|
|onclick|Function|触发点击时的回调函数|是||

|返回值名称|返回值类型|说明|
|----|----|----|----|----|
|icon|ButtonIcon|图标对应的元素，使用`insertBarIcon`函数插入。|

#### insertBarIcon

在输入框上方的图标栏中添加图标。

```typescript
window.HatsuneMiku.utils.icon.insertBarIcon(icon);
```

|参数名称|参数类型|说明|是否必需|备注|
|----|----|----|----|----|
|icon|ButtonIcon|图标元素|是|使用`createBarIcon`函数获得|

|返回值名称|返回值类型|说明|
|----|----|----|----|----|

### common

#### observeElement

监听某个元素是否出现。

```typescript
window.HatsuneMiku.utils.common.observeElement(selector, callback, continuous = false);
```

|参数名称|参数类型|说明|是否必需|备注|
|----|----|----|----|----|
|selector|string|css选择器|是|默认选中匹配该选择器的第一个元素|
|callback|Function|如果元素存在，执行的回调函数|是||
|continuous|boolean|是否持续监听|否|默认为`false`|

|返回值名称|返回值类型|说明|
|----|----|----|----|----|

### storage

#### getHanashiroSettings

获取脚本存储的内容。

```typescript
window.HatsuneMiku.utils.storage.getHanashiroSettings<T>(item: string);
```

|参数名称|参数类型|说明|是否必需|备注|
|----|----|----|----|----|
|item|string|要获取的项目名称|是|具体可通过网页控制台-存储-indexedDB页查看|

|返回值名称|返回值类型|说明|
|----|----|----|----|----|
|value|Promise<T \| null>|对应项目的值，不存在的项目返回`Promise<null>`|

#### setHanashiroSettings

写入脚本存储的内容。

```typescript
window.HatsuneMiku.utils.storage.setHanashiroSettings(item, value);
```

|参数名称|参数类型|说明|是否必需|备注|
|----|----|----|----|----|
|item|string|要写入的项目名称|是|具体可通过网页控制台-存储-indexedDB页查看|
|value|any|要写入的值|是||

|返回值名称|返回值类型|说明|
|----|----|----|----|----|

#### getInspectSettings

获取脚本存储的内容。

```typescript
window.HatsuneMiku.utils.storage.getInspectSettings();
```

|参数名称|参数类型|说明|是否必需|备注|
|----|----|----|----|----|

|返回值名称|返回值类型|说明|
|----|----|----|----|----|
|inspectSettings|Promise<IInspectSettings \| null>|网页审查工具的设置，不存在返回`Promise<null>`|

#### setHanashiroSettings

写入脚本存储的内容。

```typescript
window.HatsuneMiku.utils.storage.setInspectSettings(newSettings);
```

|参数名称|参数类型|说明|是否必需|备注|
|----|----|----|----|----|
|newSettings|IInspectSettings|新的网页审查工具设置|是|具体可通过网页控制台-存储-indexedDB页查看|

|返回值名称|返回值类型|说明|
|----|----|----|----|----|

### ui

#### snackbar

见 https://www.mdui.org/zh-cn/docs/2/functions/snackbar

#### dialog

见 https://www.mdui.org/zh-cn/docs/2/functions/dialog

#### confirm

见 https://www.mdui.org/zh-cn/docs/2/functions/confirm