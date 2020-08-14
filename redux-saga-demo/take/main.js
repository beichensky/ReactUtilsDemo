import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";

import store from "./store";

const action = (type, payload) => store.dispatch({ type, payload });

const App = () => {
  const [first, second, third, fourth, fifth] = store.getState();

  return (
    <div>
      <section>
        <span>count: {first}</span>
        <button style={{ marginLeft: 20 }} onClick={() => action("INCREMENT_ONCE", "INCREMENT_FIRST")}>
          Once Increment
        </button>
      </section>
      <hr />
      <section>
        <span>count: {second}</span>
        <button style={{ marginLeft: 20 }} onClick={() => action("INCREMENT_EVERY", "INCREMENT_SECOND")}>
          Every Increment
        </button>
      </section>
      <hr />
      <section>
        <span>count: {third}</span>
        <button style={{ marginLeft: 20 }} onClick={() => action("INCREMENT_LATEST", "INCREMENT_THIRD")}>
          Latest Increment
        </button>
      </section>
      <hr />
      <section>
        <span>count: {fourth}</span>
        <button style={{ marginLeft: 20 }} onClick={() => action("INCREMENT_LEADING", "INCREMENT_FOURTH")}>
          Leading Increment
        </button>
      </section>
      <hr />
      <section>
        <span>count: {fifth}</span>
        <button style={{ marginLeft: 20 }} onClick={() => action("INCREMENT_THROTTLE", "INCREMENT_FIFTH")}>
          Throttle Increment
        </button>
      </section>
    </div>
  );
};

function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
}

render();
store.subscribe(render);
