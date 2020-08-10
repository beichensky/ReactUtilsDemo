import React, {
  useEffect,
  useCallback,
  useState,
  useMemo,
  useLayoutEffect,
  useReducer,
} from "react";
import { bindActionCreators } from "./z-redux";
import store, { actionCreators } from "./store";

/**
 * bindActionCreators 的使用
 * applymiddleware 的使用
 */
function OriginApp() {
  const [value, setValue] = useState("");
  const [, forceUpdate] = useReducer((x) => x + 1, []);

  const { count, todos } = store.getState();

  // 生成包装后的 actionCreator，执行之后就会触发 store 数据的更新
  const { increment, decrement, getAsyncTodos, addTodo } = useMemo(
    () => bindActionCreators(actionCreators, store.dispatch),
    []
  );

  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceUpdate();
    });
    return () => {
      unsubscribe();
    };
  }, []);

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
      <h1>Hello Redux</h1>
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

export default OriginApp;
