// @flow

import { createAction } from 'redux-actions';
import { createPromiseAction } from '../utils';

/**
 * Action Types
 */

export const SIGNUP_ATTEMPT = 'user/SIGNUP_ATTEMPT';
export const SIGNUP_SUCCESS = 'user/SIGNUP_SUCCESS';

export const REQUEST_ACCESS_ATTEMPT = 'user/REQUEST_ACCESS_ATTEMPT';
export const REQUEST_ACCESS_SUCCESS = 'user/REQUEST_ACCESS_SUCCESS';

export const GET_ACCESS_REQUESTS_ATTEMPT = 'user/GET_ACCESS_REQUESTS_ATTEMPT';
export const GET_ACCESS_REQUESTS_SUCCESS = 'user/GET_ACCESS_REQUESTS_SUCCESS';

export const SET_PROFILE = 'user/SET_PROFILE';
export const SET_USERS = 'user/SET_USERS';
export const SET_PRODUCTS = 'users/SET_PRODUCTS';

/**
 * Action Creators
 */
export const userActionCreators = {
  signup: createPromiseAction(SIGNUP_ATTEMPT),
  signupSuccess: createAction(SIGNUP_SUCCESS),
  requestAccess: createPromiseAction(REQUEST_ACCESS_ATTEMPT),
  requestAccessSuccess: createAction(REQUEST_ACCESS_SUCCESS),
  getAccessRequests: createPromiseAction(GET_ACCESS_REQUESTS_ATTEMPT),
  getAccessRequestsSuccess: createAction(GET_ACCESS_REQUESTS_SUCCESS),
  setProfile: createAction(SET_PROFILE),
  setUsers: createAction(SET_USERS),
  setProducts: createAction(SET_PRODUCTS),
};
