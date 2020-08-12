import { delay, put, takeEvery } from "redux-saga/effects";

// Worker，处理 action
export function* incrementAsync() {
  // delay：阻塞 1s
  yield delay(1000);
  // put 发起同步 action
  yield put({ type: "INCREMENT" });
}

export default function* watchIncrementAsync() {
  // 创建 Watcher，监听发起的 action 并在每次接收到 action 时触发 Worker
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}
