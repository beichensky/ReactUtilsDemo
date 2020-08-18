import { useContext } from "react";
import RouterContext from "./RouterContext";

/**
 * 获取当前 match
 */
export function useRouteMatch() {
  const { match } = useContext(RouterContext);
  return match;
}

/**
 * 获取当前 location
 */
export function useLocation() {
  const { location } = useContext(RouterContext);
  return location;
}

/**
 * 获取当前 history
 */
export function useHistory() {
  const { history } = useContext(RouterContext);
  return history;
}

/**
 * 获取当前动态路由参数
 */
export function useParams() {
  const match = useRouteMatch();
  return match ? match.parmas : {};
}
