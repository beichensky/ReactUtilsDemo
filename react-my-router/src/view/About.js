import React from "react";

export default ({ history }) => {
  return (
    <>
      <h2>About Page</h2>
      <button onClick={() => history.push("/")}>to Home Page</button>
    </>
  );
};
