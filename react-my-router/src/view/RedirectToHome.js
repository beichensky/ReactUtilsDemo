import React from "react";
import { Redirect } from "../z-router";

function RedirectToHome() {
  // 重定向到首页
  return <Redirect to="/" />;
}

export default RedirectToHome;
