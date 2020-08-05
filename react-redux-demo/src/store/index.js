import { createStore, combineReducers, applyMiddleware } from "redux";

import logger from "redux-logger";
import thunk from "redux-thunk";

// 创建 counterReducer 函数 ，更新 state 数据
const counterReducer = function (state = 0, { type }) {
  switch (type) {
    case "INCREMENT":
      return ++state;
    case "DECREMENT":
      return --state;
    default:
      return state;
  }
};

// 创建 todoReducer 函数，更新 state 数据
const todoReducer = function (state = [], { type, payload }) {
  switch (type) {
    case "INIT":
      return payload;
    case "ADD":
      state.push(payload);
      return [...state];
    default:
      return state;
  }
};

// 合并 reducer
const reducer = combineReducers({
  count: counterReducer,
  todos: todoReducer,
});

// 应用插件
const ehancer = applyMiddleware(thunk, logger);

// 创建 store
const store = createStore(reducer, ehancer);

export default store;

const increment = () => ({ type: "INCREMENT" });
const decrement = () => ({ type: "DECREMENT" });

const initTodos = (todos) => ({ type: "INIT", payload: todos });
const addTodo = (todo) => ({ type: "ADD", payload: todo });

// 异步 action，执行完成之后调用同步 action
const getAsyncTodos = () => (dispatch) =>
  setTimeout(() => dispatch(initTodos(["吃饭", "睡觉", "写代码"])), 1000);

export const actionCreators = { increment, decrement, getAsyncTodos, addTodo };
