import React, { Component } from "react";
import RouterContext from "./RouterContext";
import matchPath from "./matchPath";

export default class Switch extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          const { location } = context;
          const { children } = this.props;
          /**
           * 遍历 children 组件，找到与当前 pathname 匹配的 Route 组件
           */
          let match, matchComponent;
          React.Children.forEach(children, (child) => {
            // match 未赋值且 child 是有效的 React 元素，才执行操作
            if (match == null && React.isValidElement(child)) {
              matchComponent = child;
              // 判断是否包含  path 属性，包含则使用 matchPath 判断是否匹配，不包含则使用 context 默认的 match 值
              match = child.props.path
                ? matchPath(location.pathname, child.props)
                : context.match;
            }
          });

          // 只返回匹配到的 Route 组件，并将匹配结果 match 传给 Route 组件
          return match
            ? React.cloneElement(matchComponent, {
                computedMatch: match,
              })
            : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
