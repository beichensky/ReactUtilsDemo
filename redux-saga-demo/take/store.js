import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

// 1、引入 saga 任务
import rootSaga from "./sagas";

// 2、创建 saga 中间件
const sagaMiddleware = createSagaMiddleware();

function reducer(state = [0, 0, 0, 0, 0], action) {
  switch (action.type) {
    case "INCREMENT_FIRST":
      state[0]++;
      return [...state];
    case "INCREMENT_SECOND":
      state[1]++;
      return [...state];
    case "INCREMENT_THIRD":
      state[2]++;
      return [...state];
    case "INCREMENT_FOURTH":
      state[3]++;
      return [...state];
    case "INCREMENT_FIFTH":
      state[4]++;
      return [...state];
    default:
      return state;
  }
}

// 3、应用中间件，创建 store
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

// 4、启动中间件
sagaMiddleware.run(rootSaga);

export default store;
