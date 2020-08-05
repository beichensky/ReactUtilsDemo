import React, { useEffect, useCallback, useState, useMemo } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { actionCreators } from "../store";

function ConnectBasic({ count, todos, dispatch }) {
  const [value, setValue] = useState("");

  // 生成包装后的 actionCreator，执行之后就会触发 store 数据的更新
  const { increment, decrement, getAsyncTodos, addTodo } = useMemo(
    () => bindActionCreators(actionCreators, dispatch),
    [dispatch]
  );

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
      <h2>mapDIspatchToProps 不传参数时 connect 的使用</h2>
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

// count、todos 也会被挂载到组件的 props 中
const mapStateToProps = ({ count, todos }) => ({ count, todos });

// 第二个参数没有传递，dispatch 默认会挂载到组件的 props 中
export default connect(mapStateToProps)(ConnectBasic);
