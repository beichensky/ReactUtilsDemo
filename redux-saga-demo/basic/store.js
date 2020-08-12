import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

// 1、引入 saga 任务
import rootSaga from "./sagas";

// 2、创建 saga 中间件
const sagaMiddleware = createSagaMiddleware();

function reducer(state = 0, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

// 3、应用中间件，创建 store
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

// 4、启动中间件
sagaMiddleware.run(rootSaga);

export default store;
