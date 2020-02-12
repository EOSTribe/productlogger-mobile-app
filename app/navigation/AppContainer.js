import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthStackNavigator from './AuthStack';
import ManagerStackNavigator from './ManagerStack';
import UserStackNavigator from './UserStack';
import { GuestScreen } from '../screens';

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStackNavigator,
      Manager: ManagerStackNavigator,
      User: UserStackNavigator,
      Guest: GuestScreen,
    },
    {
      initialRouteName: 'Auth',
    },
  ),
);

export default AppContainer;
