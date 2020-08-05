import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import ConnectBasic from "./views/ConnectBasic";
import ConnectUseObject from "./views/ConnectUseObject";
import ConnectUseFunction from "./views/ConnectUseFunction";
import Hook from "./views/Hook";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Hello Redux</h1>
      <Link to="/">Connect 基本使用</Link> |{" "}
      <Link to="/obj">MapDispatchToProps 作为对象传递的使用</Link> |{" "}
      <Link to="/fun">MapDispatchToProps 作为函数传递的使用</Link> |{" "}
      <Link to="/hook">Hooks 的方式使用 React Redux</Link>
      <Switch>
        <Route path="/" component={ConnectBasic} exact />
        <Route path="/obj" component={ConnectUseObject} />
        <Route path="/fun" component={ConnectUseFunction} />
        <Route path="/hook" component={Hook} />
      </Switch>
    </div>
  );
}

export default App;
