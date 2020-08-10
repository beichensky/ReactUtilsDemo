# react-redux-demo 项目内容

介绍了 `redux` 以及 `react-redux` 详细用法。

---

## 项目运行

### 准备工作

项目下载完成之后，打开项目，打开命令行，运行以下命令:

```bash
cd react-redux-demo

yarn install
# or
npm install
```

### 查看运行结果

在命令行运行：

```bash
yarn start
# or
npm run start
```

即可在浏览器中看到输出结果。

## 项目目录

- `store/index.js` 创建全局 `store`

- `index.js` 使用了 `Provider` 包裹根组件，设置全局 `store`

- `App.js` 设置路由

- `views` 路由组件文件夹

  - `ConnectBasic`：connect` 基本用法

  - `ConnectUseFunction`： `mapDispatchToProps` 参数为函数时用法

  - `ConnectUseObject`： `mapDispatchToProps` 参数为对象时用法

  - `Hook`：使用 `hooks` 的方式获取 `dispath` 和 `state`
