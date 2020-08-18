import React from "react";
import { useLocation, useRouteMatch, useHistory, useParams } from "../z-router";

function HookRouterComp() {
  // 使用 hooks 的方式使用路由参数
  const location = useLocation();
  const match = useRouteMatch();
  const history = useHistory();
  const params = useParams();

  console.log("路由参数", history, location, match, params);
  return (
    <div>
      <div>HookRouterComp 组件：当前路径为 {location.pathname}</div>
    </div>
  );
}

export default HookRouterComp;
