# MakeGKDInspectBetter

GKD 网页审查工具增强 用户脚本

Powered By Vite + Vue + TypeScript

使用`vite-plugin-monkey`插件编译

## 安装

你可以通过以下方式安装：

### GreasyFork

访问 https://greasyfork.org/zh-CN/scripts/488829 即可安装

### ScriptCat

访问 https://scriptcat.org/zh-CN/script-show-page/2322/ 即可安装

### Github

1. 打开[`Latest Release`](https://github.com/adproqwq/MakeGKDInspectBetter/releases/latest)
2. 点击下方`Assets`中的`make-gkd_inspect-better.user.js`，等待跳转后即可。

> [!WARNING]
> 请确保你已安装`TemperMonkey`或`ScriptCat`或其他类似的脚本管理器，但本脚本仅对`TemperMonkey`和`ScriptCat`进行长期支持，使用其他脚本管理器出现的任何Bug或失效，开发者保留无视的权力。

## 构建

本项目使用`pnpm`作为包管理器

1. Clone仓库

```shell
git clone https://github.com/adproqwq/MakeGKDInspectBetter.git
```

2. 安装依赖

```shell
pnpm install
```

3. 构建

```shell
pnpm build
```

构建产物将会出现在`dist`文件夹中

## 贡献

本项目需要要求使用`VSCode`和`pnpm`，使用`TypeScript`编写

你需要fork本仓库，完成修改后，向本仓库发起`Pull Request`，等待`Review`后即可合并

如果是为了解决某个`Issue`而提出的`Pull Request`，需要在`Pull Request`描述中附上对应`Issue`的编号

> [!WARNING]
> 仓库维护者有直接关闭`Pull Request`的权力
