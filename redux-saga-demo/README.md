# redux-saga-demo

Companion Repo for [redux-saga/redux-saga-beginner-tutorial](https://github.com/redux-saga/redux-saga-beginner-tutorial)

## Instructions

Setup

```bash

cd redux-saga-demo

npm install
```

Run the basic demo

```bash
npm start
```

Run the call demo

```bash
npm start:call
```

Run the take demo

```bash
npm start:take
```

## basic demo

`sage` 基本用法

如何使用 saga：

1. 引入 `saga` 任务

2. `createSagaMiddleware` 创建 `saga` 中间件

3. `applyMiddleware` 应用中间件，创建 `store`

4. `run` 启动中间件

## call demo

- call              : 阻塞异步任务，任务函数的参数作为后续参数传入

- apply             : 阻塞异步任务，第一个参数必须是 context 上下文，任务函数的参数作为数组传入

- fork              : 用法同 `call`，不进行阻塞，返回值是 `fork task`，`fork task` 可以被取消

- cancel            : 取消 `fork task`

## take demo

`take` 的使用

- take              : `action` 任务只执行一次

- takeEvery         : `action` 任务每次都会执行

- takeLatest        : 在异步任务执行时间内触发多次 `action` 任务，只执行最后一次

- takeLeading       : 在极短时间内触发多次 `action` 任务，只执行第一次

- throttle          : 节流，在给定市场内，只处理第一次接收到的 `action` 任务
