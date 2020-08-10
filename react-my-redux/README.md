# 项目说明

## 安装依赖

```bash
cd react-my-redux

npm install
# or
yarn install
```

## 项目运行

```bash
npm start
# or
yarn start
```

## 文件说明

- `store/index.js` 创建 `store`

  - 第一个 `store` 对应 `CounterApp` 组件，在根目录下的 `index.js` 文件中打开对应的 `CounterApp` 作为 `App` 组件使用

  - 第二个 `store` 对应 `TodoList` 组件，在根目录下的 `index.js` 文件中打开对应的 `TodoListApp` 作为 `App` 组件使用

  - 第三个 `store` 对应 `OriginApp` 和 `App` 组件，在根目录下的 `index.js` 文件中打开对应的 `OriginAPp` 或者 `App` 作为 `App` 组件使用

- `CounterApp` 组件：单个 `reducer` 创建 `store`，以及基本使用

- `TodoListApp` 组件：多个 ruducer 合并用法，ActionCreator 概念的引入，combinReducer API 的使用

- `OriginApp` 组件：`bindActionCreators` 和 `applymiddleware` 的应用

- `App` 组件：`react-redux` 的使用

  - 在根目录 index.js 文件中使用 Provider 包裹住根组件

  - `ConnectBasic` 组件：`connect` 的基本用法

  - `ConnectUseObject` 组件：`connect` 第二个参数作为对象时用法

  - `ConnectUseFunction` 组件：`connect` 第二个参数作为函数时用法

  - `Hook` 组件：使用 `useDispatch` 和 `useSelector` 获取 `dipatch` 和 `state`

- `z-redux/index.js`：可以切换使用我们自己写的 `redux`、`react-redux` 或者 `redux` 、`react-redux`插件

- `middleware/index.js`：导出自己编写的 `logger` 和 `thunk` 中间件

## 总结

- `createStore`: 创建 `store`

- `combineReducers`: 合并多个 `reducer`

- `applyMiddleware`: 应用插件

- `bindActionCreators`: 绑定 `dispatch` 和 `ActionCreator`

- `Provider`: 包裹根组件，传入 `store`

- `connect`: 带参的高阶组件

- `useDispatch`: hook 方式获取 `dispatch`

- `useSelector`: hook 方式获取 `state`
