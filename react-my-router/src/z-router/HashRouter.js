import React, { Component } from "react";
import { createHashHistory } from "history";
import Router from "./Router";

export default class HashRouter extends Component {
  constructor(props) {
    super(props);
    /**
     * 通过 history 的 createHashHistory API 创建 HashHistory
     *
     * history 对象中包含监听方法 listen、已经路由切换的各种 api：push、replace、goBack 等
     */
    this.history = createHashHistory();
  }

  render() {
    const { children } = this.props;
    return <Router history={this.history}>{children}</Router>;
  }
}
