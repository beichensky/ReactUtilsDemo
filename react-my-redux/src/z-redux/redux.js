/**
 * 将多个函数按顺序合成，返回一个新的函数
 * @param  {...any} funcs 多个函数
 */
export function compose(...funcs) {
  if (!funcs) {
    return;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((fn1, fn2) => (...args) => fn1(fn2(...args)));
}

/**
 * 将 actionCreator 使用 dispatch 进行包裹，生成一个可以直接触发更新的 dispatcher
 * @param {function} func actionCreator 函数
 * @param {function} dispatch
 */
export function bindActionCreator(func, dispatch) {
  return (...args) => dispatch(func(...args));
}

/**
 * 将 actionCreators 中的 actionCreator 使用 dispatch 进行包裹，返回包含 多个 dispatcher 的对象
 * @param {object} actionCreators 包含多个 actionCreator 的对象
 * @param {function} dispatch
 */
export function bindActionCreators(actionCreators, dispatch) {
  const dispatchers = {};
  Object.entries(actionCreators).forEach(([key, actionCreator]) => {
    dispatchers[key] = bindActionCreator(actionCreator, dispatch);
  });
  return dispatchers;
}

/**
 * 创建 store 对象
 * @param {function} reducer reducer 更新函数
 * @param {*} prevState 进行服务端渲染时传入的已有的 state 数据（这里我们没有用到，暂时没做处理）
 * @param {function} ehancer 插件应用结果
 */
export function createStore(reducer, prevState, ehancer) {
  // 做一次兼容，可能第二个参数传递的就是 插件应用结果
  if (typeof prevState === "function") {
    ehancer = prevState;
  }

  // 如果 ehancer 确实传入的是一个函数，则在 ehancer 函数中执行 store 的创建
  if (typeof ehancer === "function") {
    return ehancer(createStore)(reducer);
  }

  // 当前 state 数据
  let currentState;

  // 存放订阅监听对象的数组
  let listeners = [];

  // 获取当前 state 数据
  function getState() {
    return currentState;
  }

  /**
   * 订阅 state 数据变化
   * @param {function} listener 订阅监听对象
   */
  function subscribe(listener) {
    const index = listeners.length;
    listeners.push(listener);

    // unsubscribe
    return () => listeners.splice(index, 1);
  }

  /**
   * 派发 action，触发 reducer 更新 state
   * @param {plain object} action
   */
  function dispatch(action) {
    currentState = reducer(currentState, action);
    listeners.forEach((listener) => listener());
  }

  // 率先执行一次 dispatch，用来为 state 设置初始值
  dispatch({ type: Math.random() });

  return {
    getState,
    subscribe,
    dispatch,
  };
}

/**
 * combineReducers 将多个 reducer 合成一个新的 reducer 函数
 * @param {object} reducerTarget 包含多个 reducer 的对象
 */
export function combineReducers(reducerTarget) {
  const finalReducer = {};

  // 将 reducerTarget 中值不是 function 的属性过滤掉
  Object.entries(reducerTarget).forEach(([key, reducer]) => {
    if (typeof reducer === "function") {
      finalReducer[key] = reducer;
    }
  });

  // 返回一个新的 reducer 函数
  return (state = {}, action) => {
    let hasChange = false;

    // 将各个 reducer 对应的 state 值合并到同一个对象中
    let nextState = {};

    // 遍历所有的 reducer
    for (const [key, reducer] of Object.entries(finalReducer)) {
      const prevStateForKey = state[key];

      // 执行 reducer 函数，设置最新的 state 值
      const nextStateForKey = reducer(prevStateForKey, action);
      nextState[key] = nextStateForKey;

      hasChange = hasChange || nextStateForKey !== prevStateForKey;
    }
    return hasChange ? nextState : state;
  };
}

/**
 * 应用插件
 * @param  {...function} middlewares 多个插件
 */
export function applyMiddleware(...middlewares) {
  // 在 createStore 中走 ehancer 时会来到这里
  return (createStore) => (reducer) => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;

    /**
     * 执行插件函数，将 getState 和 被插件包装后的 dispatch 传给插件
     * 这里为了避免多个插件使用同一个 dispatch 互相影响，所有使用箭头函数包裹了一层
     *
     * 插件执行完毕后，将执行结果合并成一个执行链，是一个函数的数组
     *
     * 将执行链中的函数通过 compose 合成，生成一个新的函数，传入 dispatch 并执行，获取到一个被插件包装后的 dispatch
     */
    const middleParams = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args),
    };
    const middlewareChains = middlewares.map((middleware) =>
      middleware(middleParams)
    );
    dispatch = compose(...middlewareChains)(dispatch);

    // 将 store 返回出去
    return {
      ...store,
      dispatch,
    };
  };
}
