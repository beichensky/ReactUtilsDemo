import React, { Component } from "react";
import RouterContext from "./RouterContext";
import matchPath from "./matchPath";

export default class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          // children、render、component、path 是通过设置属性传递过来的，computedMatch 是 Switch 组件传递过来的
          const {
            children,
            render,
            component,
            path,
            computedMatch,
          } = this.props;

          const { location } = context;

          /**
           * 如果外层包裹了 Switch 组件，则使用 Switch 传入的 computedMatch 属性作为 match，
           * 否则的话判断是否包含 path 属性，有的话使用 matchPath 进行匹配
           * 不包含 path 属性，则使用 context 中默认的 match
           */
          const match =
            computedMatch ||
            (path ? matchPath(location.pathname, this.props) : context.match);

          // 将 context 中的值和 match 组装起来，合并到子组件的 props 中
          const props = {
            ...context,
            match,
          };
          /**
           * 1、因为在 hook API 和 withRouter 高阶组件中使用 useContext 时，获取到的是最近的 context 值，所以取到的 match 是 context 中默认的 match 值，
           *    这里又使用 RouterContext.Provider 包裹一层，将最新的 match 值放入 Context 中
           *
           * 2、返回值的优先级顺序：children > component > render
           *    ①、当前组件和 location.path 是否匹配，不匹配的话展示 children
           *    ②、匹配的话，有 children 展示 children
           *    ③、没有 children 展示 component
           *    ④、没有 component 展示 render
           *    ⑤、没有 render 返回 null
           */
          return (
            <RouterContext.Provider value={props}>
              {match
                ? children
                  ? typeof children === "function"
                    ? children(props)
                    : children
                  : component
                  ? React.createElement(component, props)
                  : render
                  ? render(props)
                  : null
                : children
                ? typeof children === "function"
                  ? children(props)
                  : children
                : null}
            </RouterContext.Provider>
          );
        }}
      </RouterContext.Consumer>
    );
  }
}
