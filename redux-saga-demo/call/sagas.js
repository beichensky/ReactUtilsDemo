import {
  apply,
  call,
  fork,
  put,
  takeEvery,
  all,
  take,
  cancel,
  cancelled,
} from "redux-saga/effects";

// 使用 call API 进行异步操作
function* callUserInfo({ payload }) {
  const res = yield call(fetchUser, payload.name, payload.age);
  yield put({ type: "GET_USER", payload: res });
  if (!res || res.length < 1) {
    yield alert("未查询到对应的用户信息");
  }
}

// 使用 apply API 进行请求用户信息
function* applyUserInfo({ payload }) {
  /**
   * apply 第一个参数是上下文对象，第三个参数是 arg 数组
   */
  const res = yield apply(null, fetchUser, [payload.name, payload.age]);
  yield put({ type: "GET_USER", payload: res });
  if (!res || res.length < 1) {
    yield alert("未查询到对应的用户信息");
  }
}

// 使用 fork API 进行请求用户信息
function* forkUserInfo(action) {
  /**
   * 1、fork 返回的是一个 task，所以不能像 call 和 apply 一样直接操作返回值
   * 2、fork 是不进行阻塞，所以代码会直接向下执行，因此异步操作要放到新的 generate 函数中执行
   */
  const task = yield fork(startForkTask, action);
  // 注册 CANCEL_FORK action
  yield take("CANCEL_FORK");
  /**
   * CANCEL_FORK action 触发时调用 cancel，取消 frok task
   * frok task 被取消后会走到 fork task 函数的 finally 代码块中
   */
  yield cancel(task);
}

// fork task，真正请求用户信息的 generte 函数
function* startForkTask({ payload }) {
  try {
    const res = yield call(fetchUser, payload.name, payload.age);
    yield put({ type: "GET_USER", payload: res });
    if (!res || res.length < 1) {
      yield alert("未查询到对应的用户信息");
    }
  } finally {
    // frok task 被取消后会走到这里，弹出提示
    if (yield cancelled()) {
      yield alert("frok 任务取消成功");
    }
  }
}

// 监听 CALL_USER action
function* watchCall() {
  yield takeEvery("CALL_USER", callUserInfo);
}

// 监听 APPLY_USER action
function* watchApply() {
  yield takeEvery("APPLY_USER", applyUserInfo);
}

// 监听 FORK_USER action
function* watchFork() {
  yield takeEvery("FORK_USER", forkUserInfo);
}

export default function* rootSage() {
  yield all([call(watchCall), call(watchApply), call(watchFork)]);
}

/**
 * 模拟网络请求，获取用户信息
 */
const users = [
  { name: "Jack", age: "20", addr: "shanghai", gender: "man" },
  { name: "Lily", age: "18", addr: "hangzhou", gender: "woman" },
  { name: "Rose", age: "18", addr: "beijing", gender: "woman" },
  { name: "Mike", age: "22", addr: "nanjing", gender: "man" },
];

function fetchUser(name, age) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = users.filter(
        (user) => (!name || user.name === name) && (!age || user.age === age)
      );
      resolve(result);
    }, 1500);
  });
}
