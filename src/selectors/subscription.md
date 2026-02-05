# 快捷选择器订阅文档

在任意可远程请求的地方创建 `selectors.meta.json` 文件。

```json
{
  "$schema": "https://raw.githubusercontent.com/adproqwq/MikuMagicWand/Miku/selectors.meta.schema.json",
  "name": "名称",
  "id": "订阅id",
  "description": "描述",
  "selectors": "http://127.0.0.1:5500/user.subscription.json"
}
```

目前只有 `name`、`id` 与 `selectors` 字段是必需的。

`id` 字段内容将会作为外显名称，而不是 `name`。

`selectors` 字段填入一个链接，指向最终的订阅文件。

订阅文件可通过`管理选择器-导出-订阅导出`获得。

距上次更新时间大于 1 小时时，脚本会自动更新订阅。

你可以在设置中管理你的订阅。

手动更新功能尚在开发。
