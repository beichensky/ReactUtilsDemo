import React, { Component } from "react";
import RouterContext from "./RouterContext";

export default class Router extends Component {
  static computeRootMatch(pathname) {
    return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
  }

  constructor(props) {
    super(props);
    this.state = {
      location: props.history.location,
    };
  }

  componentDidMount() {
    // 由于路由变化后，需要重新渲染子组件，所以将 location 设置为 state 并且监听路有变化，重新设置 location
    this.unlisten = this.props.history.listen((location) => {
      this.setState({
        location,
      });
    });
  }

  componentWillUnmount() {
    // 组件销毁前，取消路由监听
    this.unlisten();
  }

  render() {
    /**
     * 通过 Context 传值，将 history、location、match 传递给子组件
     */
    const { history, children } = this.props;
    const { location } = this.state;
    // 为 match 设置默认值
    const match = Router.computeRootMatch(location.pathname);
    return (
      <RouterContext.Provider value={{ history, location, match }}>
        {children}
      </RouterContext.Provider>
    );
  }
}
