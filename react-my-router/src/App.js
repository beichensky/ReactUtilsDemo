import React from "react";
import { Link, Route, Switch } from "./z-router";
import Home from "./view/Home";
import About from "./view/About";
import WithRouterComp from "./components/WithRouterComp";
import HookRouterComp from "./components/HookRouterComp";

function App() {
  return (
    <div className="App">
      <Link to="/">Home</Link> | <Link to="/about">About</Link>
      <br /> <br />
      <WithRouterComp />
      <HookRouterComp />
      <Switch>
        {/* 优先级：children > component > render，外层未包裹 Switch 的情况下，无论路由是否匹配，children 都会展示 */}
        <Route
          path="/"
          exact
          component={Home}
          // children={() => <div>Children</div>}
          // render={() => <div>render</div>}
        />
        <Route path="/about" component={About} />
      </Switch>
    </div>
  );
}

export default App;
