import React, { useContext } from "react";
import RouterContext from "./RouterContext";

/**
 * 将路由属性注入到普通组件中的高阶函数
 * @param {*} WrapperComponent 普通组件
 */
export default function withRouter(WrapperComponent) {
  return (props) => {
    const context = useContext(RouterContext);
    // 将 context 中的内容合并到普通组件的 props 中
    return <WrapperComponent {...context} {...props} />;
  };
}
