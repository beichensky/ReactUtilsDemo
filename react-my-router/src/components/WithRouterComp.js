import React, { Component } from "react";
import { withRouter } from "../z-router";

class WithRouterComp extends Component {
  render() {
    return (
      <div>WithRouterComp 组件：当前路径为 {this.props.location.pathname}</div>
    );
  }
}

// 使用 withRouter 包裹组件，将路由参数注入到 props 中
export default withRouter(WithRouterComp);
