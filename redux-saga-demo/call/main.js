import "babel-polyfill";

import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom";

import store from "./store";

const action = (type, payload) =>
  store.dispatch({
    type,
    payload,
  });

const User = ({ user }) => {
  return (
    <div>
      <span>姓名: {user.name}; </span>
      <span>年龄: {user.age}; </span>
      <span>地址: {user.addr}; </span>
      <span>性别: {user.gender}; </span>
    </div>
  );
};

const App = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleClick = useCallback(
    (type) => {
      action(type, { name, age });
    },
    [name, age]
  );

  const state = store.getState();

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <div>
          用户信息：
          {state.map((user) => (
            <User user={user} key={user.name} />
          ))}
        </div>
        <hr />
        <input
          type="text"
          placeholder="请输入用户名称"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {"  "}
        <input
          type="text"
          placeholder="请输入用户年龄"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <br />
        <span style={{ fontSize: 12, color: "gray" }}>
          tip: 会根据用户名称和年龄查询到对应的用户信息（可不填）
        </span>
      </div>
      <hr />
      <button onClick={() => handleClick("CALL_USER")}>Call Search</button>
      <br />
      <button onClick={() => handleClick("APPLY_USER")}>Apply Search</button>
      <br />
      <button onClick={() => handleClick("FORK_USER")}>Fork Search</button>{" "}
      <button onClick={() => handleClick("CANCEL_FORK")}> Cancle Fork</button>
    </div>
  );
};

function render() {
  ReactDOM.render(<App />, document.querySelector("#root"));
}

render();

store.subscribe(render);
