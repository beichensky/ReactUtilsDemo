import {
  delay,
  fork,
  take,
  cancel,
  call,
  actionChannel,
} from "redux-saga/effects";

// takeEvery 辅助函数实现
export const takeEvery = (patternOrChannel, saga, ...args) =>
  fork(function* () {
    while (true) {
      const action = yield take(patternOrChannel);
      yield fork(saga, ...args.concat(action));
    }
  });

// takeLatest 辅助函数实现
export const takeLatest = (patternOrChannel, saga, ...args) =>
  fork(function* () {
    let lastTask;
    while (true) {
      const action = yield take(patternOrChannel);
      if (lastTask) {
        yield cancel(lastTask); // 如果任务已经结束，cancel 则是空操作
      }
      lastTask = yield fork(saga, ...args.concat(action));
    }
  });

// takeLeading 辅助函数实现
export const takeLeading = (patternOrChannel, saga, ...args) =>
  fork(function* () {
    while (true) {
      const action = yield take(patternOrChannel);
      yield call(saga, ...args.concat(action));
    }
  });

// throttle 辅助函数实现
export const throttle = (ms, pattern, task, ...args) =>
  fork(function* () {
    const throttleChannel = yield actionChannel(pattern);

    while (true) {
      const action = yield take(throttleChannel);
      yield fork(task, ...args, action);
      yield delay(ms);
    }
  });
