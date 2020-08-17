import React from "react";

export default ({ history }) => {
  return (
    <>
      <h2>Home Page</h2>
      <button onClick={() => history.push("/about")}>to About Page</button>
    </>
  );
};
