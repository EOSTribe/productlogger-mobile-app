// @flow

import {
  SET_PROFILE,
  SET_USERS,
  SET_PRODUCTS,
  GET_ACCESS_REQUESTS_SUCCESS,
} from './actions';
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
    case GET_ACCESS_REQUESTS_SUCCESS:
      return {
        ...state,
        requests: payload,
      };
    default:
      return state;
  }
}
