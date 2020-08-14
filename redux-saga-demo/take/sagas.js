import {
  all,
  call,
  delay,
  put,
  take,
  // takeEvery,
  // takeLatest,
  // takeLeading,
  // throttle,
} from "redux-saga/effects";

import { takeEvery, takeLatest, takeLeading, throttle } from "./helper";

// Worker，处理 action
export function* incrementAsync({ payload }) {
  console.log("payload", payload);
  // delay：阻塞 1s
  yield delay(1000);
  // put 发起同步 action
  yield put({ type: payload });
}

export function* watchOnce() {
  // 用户发起的 INCREMENT_ONCE action 只执行一次
  const action = yield take("INCREMENT_ONCE");
  yield call(incrementAsync, action);
}

export function* wtahcEvery() {
  //用户发起的 INCREMENT_EVERY action，每次都会执行
  yield takeEvery("INCREMENT_EVERY", incrementAsync);
}

export function* watchLatest() {
  // 即使用户以极快的速度连续多次触发 INCREMENT_LATEST action，都只会以最后的一个结束。
  yield takeLatest("INCREMENT_LATEST", incrementAsync);
}

export function* watchLeading() {
  // 如果用户以极快的速度连续多次触发 INCREMENT_LEADING action，都只会保持以第一个 action 运行。
  yield takeLeading("INCREMENT_LEADING", incrementAsync);
}

function* watchtThrottle() {
  // 是在处理任务时，无视给定的时长内新传入的 action。
  yield throttle(1000, "INCREMENT_THROTTLE", incrementAsync);
}

export default function* rootSaga() {
  // 同时启动多个任务
  yield all([
    call(watchOnce),
    call(wtahcEvery),
    call(watchLatest),
    call(watchLeading),
    call(watchtThrottle),
  ]);
}
