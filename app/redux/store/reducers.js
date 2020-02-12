// @flow

import { persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { LOGOUT } from '../modules/sharedActions';

import { userState, resetReducer } from '../modules';

const config = {
  version: 0,
  key: '@eostribe_productlogger_redux_store',
  storage: AsyncStorage,
};

const appReducer = persistCombineReducers(config, {
  userState,
});

export default function rootReducer(state, action) {
  let finalState = appReducer(state, action);

  if (action.type === LOGOUT) {
    finalState = resetReducer(finalState, action);
  }

  return finalState;
}
