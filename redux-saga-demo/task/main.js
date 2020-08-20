import "babel-polyfill";

import React, { useMemo, useLayoutEffect, useReducer } from "react";
import ReactDOM from "react-dom";

import store from "./store";

const action = (type) => store.dispatch({ type });

const style = {
  display: "inline-block",
  width: 240,
  textAlign: "left",
  verticalAlign: "top",
};

const spanStyle = {
  color: "gray",
  fontSize: 14,
};

// 任务开始时间
let orderStartTime = 0;
let allStartTime = 0;
let raceStartTime = 0;

// 任务结束时间
let orderEndTime = 0;
let allEndTime = 0;
let raceEndTime = 0;

const App = () => {
  const { order, all, race } = store.getState();
  const [, forceUpdate] = useReducer((x) => x + 1, []);

  useLayoutEffect(() => {
    orderEndTime = Date.now();
    forceUpdate();
  }, [order.length]);

  useLayoutEffect(() => {
    allEndTime = Date.now();
    forceUpdate();
  }, [all.length]);

  useLayoutEffect(() => {
    raceEndTime = Date.now();
    forceUpdate();
  }, [race.length]);

  return (
    <div style={{ padding: 50, textAlign: "center" }}>
      <section style={style}>
        <button
          onClick={() => {
            orderStartTime = Date.now();
            action("EXECUTE_ORDER");
          }}
        >
          顺序执行任务
        </button>
        <ul>
          {order.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
        {order.length > 0 && (
          <span style={spanStyle}>
            任务执行时长：{orderEndTime - orderStartTime} ms
          </span>
        )}
      </section>

      <section style={style}>
        <button
          onClick={() => {
            allStartTime = Date.now();
            action("EXECUTE_ALL");
          }}
        >
          同时执行多个任务
        </button>
        <ul>
          {all.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
        {all.length > 0 && (
          <span style={spanStyle}>
            任务执行时长：{allEndTime - allStartTime} ms
          </span>
        )}
      </section>

      <section style={style}>
        <button
          onClick={() => {
            raceStartTime = Date.now();
            action("EXECUTE_RACE");
          }}
        >
          执行速度最快的任务
        </button>
        <ul>
          {race.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
        {race.length > 0 && (
          <span style={spanStyle}>
            任务执行时长：{raceEndTime - raceStartTime} ms
          </span>
        )}
      </section>
    </div>
  );
};

function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
}

render();
store.subscribe(render);
