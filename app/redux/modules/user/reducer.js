// @flow

import { SET_PROFILE, SET_USERS, SET_PRODUCTS } from './actions';
import { defaultReducers } from '../defaultReducers';

const DEFAULT = defaultReducers.userState;

export default function userState(state = DEFAULT, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case SET_PROFILE:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...payload,
        },
      };
    case SET_USERS:
      return {
        ...state,
        users: payload,
      };
    case SET_PRODUCTS:
      return {
        ...state,
        products: payload,
      };
    default:
      return state;
  }
}
