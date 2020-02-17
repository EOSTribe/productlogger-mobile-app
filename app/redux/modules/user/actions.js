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
  setProfile: createAction(SET_PROFILE),
  setUsers: createAction(SET_USERS),
  setProducts: createAction(SET_PRODUCTS),
};
