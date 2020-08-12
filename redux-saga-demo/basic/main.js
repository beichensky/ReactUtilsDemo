import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";

import store from "./store";

const action = (type) => store.dispatch({ type });

const App = () => (
  <div>
    <button onClick={() => action("INCREMENT")}>Increment</button>{" "}
    <button onClick={() => action("DECREMENT")}>Decrement</button>{" "}
    <button onClick={() => action("INCREMENT_ASYNC")}>
      Increment after 1 second
    </button>
    <hr />
    <div>Clicked: {store.getState()} times</div>
  </div>
);

function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
}

render();
store.subscribe(render);
