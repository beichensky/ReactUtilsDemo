import React, { Component } from "react";
import RouterContext from "./RouterContext";

export default class Link extends Component {
  static contextType = RouterContext;

  handleClick = (event) => {
    // 阻止 a 标签的默认行为，使用 history 的 api 进行路由跳转
    event.preventDefault();
    const { history } = this.context;
    const { replace, to } = this.props;
    replace ? history.replace(to) : history.push(to);
  };

  render() {
    const { to, children, ...restProps } = this.props;
    return (
      <a href={to} onClick={this.handleClick} {...restProps}>
        {children}
      </a>
    );
  }
}
