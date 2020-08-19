import { Component } from "react";

/**
 * 借用生命周期组件，有些路由组件不方便直接在内部进行函数调用，可以借助 LifeCycle 组件进行函数调用
 */
export default class LifeCycle extends Component {
  componentDidMount() {
    this.props.onMount && this.props.onMount.call(this, this);
  }

  componentDidUpdate(prevProps) {
    this.props.onUpdate && this.props.onUpdate.call(this, this, prevProps);
  }

  componentWillUnmount() {
    this.props.onUnmount && this.props.onUnmount.call(this, this);
  }

  render() {
    return null;
  }
}


