import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootSage from "./sagas";

const sagaMiddleware = createSagaMiddleware();

function reducer(state = [], { type, payload }) {
  switch (type) {
    case "GET_USER":
      return payload;
    default:
      return state;
  }
}

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSage);

export default store;
