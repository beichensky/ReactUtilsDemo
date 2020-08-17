import React from "react";
import { Link, Route } from "./z-router";
import Home from "./view/Home";
import About from "./view/About";

function App() {
  return (
    <div className="App">
      <Link to="/">Home</Link> | <Link to="/about">Dynamic Route</Link>
      <br /> <br />
      {/* 优先级：children > component > render，外层未包裹 Switch 的情况下，无论路由是否匹配，children 都会展示 */}
      <Route
        path="/"
        exact
        component={Home}
        // children={() => <div>Children</div>}
        // render={() => <div>render</div>}
      />
      <Route path="/about" component={About} />
    </div>
  );
}

export default App;
