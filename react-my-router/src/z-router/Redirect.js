import React from "react";
import RouterContext from "./RouterContext";
import LifeCycle from "./LifeCycle";

export default function Redirect({ to, push }) {
  return (
    <RouterContext.Consumer>
      {(context) => {
        const { history } = context;
        // 借助 LifeCycle 执行路由跳转操作
        return (
          <LifeCycle
            onMount={() => {
              push ? history.push(to) : history.replace(to);
            }}
          />
        );
      }}
    </RouterContext.Consumer>
  );
}
