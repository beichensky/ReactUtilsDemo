import React, { useContext, useEffect, useReducer } from "react";
import { bindActionCreators } from "./redux";

const StoreContext = React.createContext();

/**
 * connect 函数，源码中包含四个参数，我们这里只用到这些，所以就暂时只实现了前三个参数
 *
 * @param {*} mapStateToProps 将 state 合并到组件的 props 中的函数
 * @param {*} mapDispatchToProps 将 actionCreator 合并到组件的 props 中的函数
 * @param {*} mergeProps 自定义属性合并到组件的 props
 */
const connect = (mapStateToProps, mapDispatchToProps, mergeProps) => (
  WrapperComponent
) => {
  return (props) => {
    const { getState, dispatch, subscribe } = useContext(StoreContext);
    const [, forceUpdate] = useReducer((x) => x + 1, []);
    // 执行 mapStateToProps，获取用户需要的 state 数据
    const stateProps = mapStateToProps(getState());
    // 默认将 dispatch 挂载到 props 上
    let dispatchProps = { dispatch };

    // 判断 mapDispatchToProps 是函数还是对象，函数的话，执行获取返回的对象
    if (typeof mapDispatchToProps === "function") {
      dispatchProps = mapDispatchToProps(dispatch);
    } else if (typeof mapDispatchToProps === "object") {
      // 对象的话，直接将对象中的 actionCreator 使用 dispatch 进行包装
      dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
    }

    mergeProps =
      typeof mergeProps === "function"
        ? mergeProps(stateProps, dispatchProps, props)
        : {};

    useEffect(() => {
      // 添加事件订阅，state 发生变化时会触发，更新组件
      const unsubscribe = subscribe(() => forceUpdate());
      return () => {
        unsubscribe();
      };
    }, [subscribe]);

    return (
      <WrapperComponent
        {...props}
        {...stateProps}
        {...dispatchProps}
        {...mergeProps}
      />
    );
  };
};

/**
 * 获取 store 对象的 hook
 */
const useStore = () => {
  const store = useContext(StoreContext);
  return store;
};

/**
 * 获取 store 中 dispatch 的 hook
 */
const useDispatch = () => {
  const store = useStore();
  return store.dispatch;
};

/**
 * useSelector 从 store 中获取当前组件所需要的 state 的 hook
 *
 * @param {(state) => props} selector 用户传入的函数，接收 store 当前的 state，返回一个组织好的数据对象
 */
const useSelector = (selector) => {
  const [, forceUpdate] = useReducer((x) => x + 1, []);
  const { subscribe, getState } = useStore();

  useEffect(() => {
    // 添加事件订阅，state 发生变化时会触发，更新组件
    const unsubscribe = subscribe(() => forceUpdate());
    return () => {
      unsubscribe();
    };
  }, [subscribe]);
  return selector(getState());
};

/**
 * Provider 组件，用来传递 Context 中数据，进行跨层级组件通信
 */
const Provider = ({ store, children }) => (
  // 将 store 作为 value 传递下去
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
);
export { Provider, connect, useDispatch, useSelector };
