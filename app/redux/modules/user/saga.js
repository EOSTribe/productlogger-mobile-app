// @flow

import { take, put, call, fork, all } from 'redux-saga/effects';

import {
  userActionCreators,
  SIGNUP_ATTEMPT,
  REQUEST_ACCESS_ATTEMPT,
  GET_ACCESS_REQUESTS_ATTEMPT,
} from './actions';

import { register, requestAccess, getAccessRequests } from './connections';

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

export function* asyncRequestAccessAttempt({ payload, resolve, reject }) {
  try {
    const response = yield call(requestAccess, payload);
    if (response.error) {
      reject(response.err);
    } else {
      yield put(userActionCreators.requestAccessSuccess(response));
      resolve(response);
    }
  } catch (error) {
    reject(error);
  }
}

export function* watchRequestAccessAttempt() {
  while (true) {
    const action = yield take(REQUEST_ACCESS_ATTEMPT);
    yield* asyncRequestAccessAttempt(action);
  }
}

export function* asyncGetAccessRequestsAttempt({ payload, resolve, reject }) {
  try {
    const response = yield call(getAccessRequests, payload);
    if (response.error) {
      reject(response.err);
    } else {
      yield put(userActionCreators.getAccessRequestsSuccess(response));
      resolve(response);
    }
  } catch (error) {
    reject(error);
  }
}

export function* watchGetAccessRequestsAttempt() {
  while (true) {
    const action = yield take(GET_ACCESS_REQUESTS_ATTEMPT);
    yield* asyncGetAccessRequestsAttempt(action);
  }
}

export default function*() {
  yield all([fork(watchSignupAttempt)]);
  yield all([fork(watchRequestAccessAttempt)]);
  yield all([fork(watchGetAccessRequestsAttempt)]);
}
