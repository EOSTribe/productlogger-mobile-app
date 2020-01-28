import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthStackNavigator from './AuthStack';
import ManagerStackNavigator from './ManagerStack';
import UserStackNavigator from './UserStack';

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStackNavigator,
      Manager: ManagerStackNavigator,
      User: UserStackNavigator,
    },
    {
      initialRouteName: 'Auth',
    })
);

export default AppContainer;