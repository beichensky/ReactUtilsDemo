import React from "react";
import RouterContext from "./RouterContext";
import LifeCycle from "./LifeCycle";

function Prompt({ message, when = true }) {
  return (
    <RouterContext.Consumer>
      {(context) => {
        // 借助 history 的 block 函数进行路由切换前进行提示操作
        const method = context.history.block;

        // 根据 when 参数判断是否在路由切换时进行提示
        if (!when) {
          return null;
        }

        // 借助 LifeCycle 组件在各个生命周期下执行函数操作
        return (
          <LifeCycle
            onMount={(self) => {
              // 将 message 信息注册到 window 的 beforeunload 事件上
              self.release = method(message);
            }}
            onUpdate={(self, prevProps) => {
              if (prevProps.message !== message) {
                // 释放掉之前注册的 beforeunload 事件，重新进行注册
                self.release();
                self.release = method(message);
              }
            }}
            onUnmount={(self) => {
              // 组件销毁前释放掉注册的 beforeunload 事件
              self.release();
            }}
            message={message}
          />
        );
      }}
    </RouterContext.Consumer>
  );
}

export default Prompt;
