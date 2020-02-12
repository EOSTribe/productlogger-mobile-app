/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';

import createStore from './app/redux/store';

const store = createStore();

import AppContainer from './app/navigation/AppContainer';

const App = props => {
  useEffect(() => {
    enableScreens();
  }, []);

  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;
