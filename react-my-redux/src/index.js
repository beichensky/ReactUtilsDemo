import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "./z-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
// import App from "./CounterApp";
// import App from './TodoListApp';
// import App from './OriginApp';
import App from "./App";
import store from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
