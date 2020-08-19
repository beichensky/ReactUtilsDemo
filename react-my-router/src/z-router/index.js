import BrowserRouter from "./BrowserRouter";
import HashRouter from "./HashRouter";

import Link from "./Link";
import Route from "./Route";
import Switch from "./Switch";
import Redirect from "./Redirect";
import Prompt from "./Prompt";

import withRouter from "./withRouter";
import { useLocation, useRouteMatch, useHistory, useParams } from "./hook";
import matchPath from "./matchPath";

export {
  BrowserRouter,
  HashRouter,
  Link,
  Route,
  Switch,
  Redirect,
  Prompt,
  useLocation,
  useRouteMatch,
  useHistory,
  useParams,
  withRouter,
  matchPath,
};

// 源码中的路由相关组件
// export {
//   BrowserRouter,
//   HashRouter,
//   Link,
//   Route,
//   Switch,
//   Redirect,
//   Prompt,
//   matchPath,
//   useLocation,
//   useRouteMatch,
//   useHistory,
//   useParams,
//   withRouter,
// } from "react-router-dom";
