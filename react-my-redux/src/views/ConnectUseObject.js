import React, { useEffect, useCallback, useState } from "react";
import { connect } from "../z-redux";
import { actionCreators } from "../store";

function ConnectUseObject({
  count,
  todos,
  increment,
  decrement,
  getAsyncTodos,
  addTodo,
}) {
  const [value, setValue] = useState("");

  // 初始化 TodoList
  useEffect(() => {
    getAsyncTodos();
  }, [getAsyncTodos]);

  const add = useCallback(() => {
    if (value) {
      // 分发 action
      addTodo(value);
      setValue("");
    }
  }, [value, addTodo]);

  return (
    <div>
      <h2>mapDIspatchToProps 作为对象传递时 connect 的使用</h2>
      <p>count: {count}</p>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <br />
      <br />
      <input
        placeholder="请输入待办事项"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={add}>add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
    </div>
  );
}

// count、todos 会被挂载到组件的 props 中
const mapStateToProps = ({ count, todos }) => ({ count, todos });

// actionCreators 中的 actionCreator 会被 dispatch 进行包装，之后合并到组建的 props 中去
const mapDispatchToProps = { ...actionCreators };

export default connect(mapStateToProps, mapDispatchToProps)(ConnectUseObject);
