import React, {
  useEffect,
  useCallback,
  useState,
  useReducer,
  useLayoutEffect,
} from "react";
import store, { actionCreators } from "./store";

/**
 * combinReducer 使用
 * ActionCreator 使用
 *
 * TODO：此时异步函数调用还不能使用
 */
const { increment, decrement, getAsyncTodos, addTodo } = actionCreators;
function OriginApp() {
  const [value, setValue] = useState("");
  const [, forceUpdate] = useReducer((x) => x + 1, []);

  const { count, todos } = store.getState();

  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceUpdate();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // 初始化 TodoList
  //   useEffect(() => {
  //     store.dispatch(getAsyncTodos());
  //   }, []);

  const add = useCallback(() => {
    if (value) {
      // 分发 action
      store.dispatch(addTodo(value));
      setValue("");
    }
  }, [value]);

  return (
    <div>
      <h1>Hello Redux</h1>
      <p>count: {count}</p>
      <button onClick={() => store.dispatch(increment())}>increment</button>
      <button onClick={() => store.dispatch(decrement())}>decrement</button>
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
