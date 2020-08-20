import { all, call, put, race, takeLatest } from "redux-saga/effects";

/**
 * 顺序执行异步任务
 */
export function* addOrder() {
  yield put({ type: "CLEAR_ORDER" });

  const num1 = yield call(fetchData, 1);
  yield put({ type: "ADD_ORDER", payload: num1 });

  const num2 = yield call(fetchData, 2);
  yield put({ type: "ADD_ORDER", payload: num2 });

  const num3 = yield call(fetchData, 3);
  yield put({ type: "ADD_ORDER", payload: num3 });

  const num4 = yield call(fetchData, 4);
  yield put({ type: "ADD_ORDER", payload: num4 });
}

/**
 * all 操作，同时执行所有的异步操作，等待所有异步执行完毕后返回，其中任一异步任务失败，则其他异步任务会被自动取消。
 */
export function* addAll() {
  yield put({ type: "CLEAR_ALL" });

  const nums = yield all([
    call(fetchData, 1),
    call(fetchData, 2),
    call(fetchData, 3),
    call(fetchData, 4),
  ]);

  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    yield put({ type: "ADD_ALL", payload: num });
  }
}

/**
 * race 操作，同时执行所有的异步操作，第一个异步任务执行完毕后立即返回，其余异步任务会被自动取消
 */
export function* addRace() {
  yield put({ type: "CLEAR_RACE" });

  const nums = yield race([
    call(fetchData, 1),
    call(fetchData, 2),
    call(fetchData, 3),
    call(fetchData, 4),
  ]);

  const num = nums.find(Boolean);
  yield put({ type: "ADD_RACE", payload: num });
}

/**
 * 监听 EXECUTE_ORDER action
 */
export function* watchOrder() {
  yield takeLatest("EXECUTE_ORDER", addOrder);
}

/**
 * 监听 EXECUTE_ALL action
 */
export function* watchAll() {
  yield takeLatest("EXECUTE_ALL", addAll);
}

/**
 * 监听 EXECUTE_RACE action
 */
export function* watchRace() {
  yield takeLatest("EXECUTE_RACE", addRace);
}

export default function* rootSaga() {
  // 同时启动多个任务
  yield all([call(watchOrder), call(watchAll), call(watchRace)]);
}

/**
 * 模拟网络请求延时操作，返回数据
 * @param {*} num
 */
function fetchData(num) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(num);
    }, Math.random() * 1000 + 500);
  });
}
