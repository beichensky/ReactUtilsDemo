import React, { useEffect, useCallback, useState, useMemo } from "react";
import { bindActionCreators, useDispatch, useSelector } from "../z-redux";
import { actionCreators } from "../store";

function Hook() {
  const [value, setValue] = useState("");

  // 从 useDispatch 中获取 dispatch
  const dispatch = useDispatch();

  // 生成包装后的 actionCreator，执行之后就会触发 store 数据的更新
  const { increment, decrement, getAsyncTodos, addTodo } = useMemo(
    () => bindActionCreators(actionCreators, dispatch),
    [dispatch]
  );

  // 通过 useSelector 获取需要用到 state 值
  const { count, todos } = useSelector(({ count, todos }) => ({
    count,
    todos,
  }));

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
      <h2>Hooks 的方式使用 React Redux</h2>
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

export default Hook;
