/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useEffect } from 'react';
import { enableScreens } from 'react-native-screens';

import AppContainer from './app/navigation/AppContainer';

const App = props => {

  useEffect(() => {
    enableScreens();
  }, [])

  return (
    <AppContainer />
  );
}

export default App;
