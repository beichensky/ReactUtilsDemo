import React from "react";

import { Prompt } from "../z-router";

export default ({ history }) => {
  return (
    <>
      <h2>About Page</h2>
      <button onClick={() => history.push("/")}>to Home Page</button>
      <Prompt message="确定要进行路由切换吗？" />
    </>
  );
};
