import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

// 1、引入 saga 任务
import rootSaga from "./sagas";

// 2、创建 saga 中间件
const sagaMiddleware = createSagaMiddleware();

const initialState = {
  order: [],
  all: [],
  race: [],
};
function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case "ADD_ORDER":
      state.order.push(payload);
      return { ...state };
    case "ADD_ALL":
      state.all.push(payload);
      return { ...state };
    case "ADD_RACE":
      state.race.push(payload);
      return { ...state };
    case "CLEAR_ORDER":
      state.order = [];
      return { ...state };
    case "CLEAR_ALL":
      state.all = [];
      return { ...state };
    case "CLEAR_RACE":
      state.race = [];
      return { ...state };
    default:
      return state;
  }
}

// 3、应用中间件，创建 store
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

// 4、启动中间件
sagaMiddleware.run(rootSaga);

export default store;
