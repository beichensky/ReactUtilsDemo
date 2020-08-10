import React, { useEffect, useReducer } from "react";
import store from "./store";

/**
 * 最基本的 redux 使用
 */
function CounterApp() {
  const count = store.getState();
  const [, forceUpdate] = useReducer((x) => x + 1, []);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceUpdate();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <h1>Hello Redux</h1>
      <p>count: {count}</p>
      <button onClick={() => store.dispatch({ type: "INCREMENT" })}>
        increment
      </button>
      <button onClick={() => store.dispatch({ type: "DECREMENT" })}>
        decrement
      </button>
      <br />
      <br />
    </div>
  );
}

export default CounterApp;
