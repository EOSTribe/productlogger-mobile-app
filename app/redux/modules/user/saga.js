// @flow

import { take, put, call, fork, all } from 'redux-saga/effects';

import { userActionCreators, SIGNUP_ATTEMPT } from './actions';

import { register } from './connections';

export function* asyncSignupAttempt({ payload, resolve, reject }) {
  try {
    const response = yield call(register, payload);
    if (response.error) {
      reject(response.err);
    } else {
      yield put(userActionCreators.signupSuccess(response));
      resolve(response);
    }
  } catch (error) {
    reject(error);
  }
}

export function* watchSignupAttempt() {
  while (true) {
    const action = yield take(SIGNUP_ATTEMPT);
    yield* asyncSignupAttempt(action);
  }
}

export default function*() {
  yield all([fork(watchSignupAttempt)]);
}
