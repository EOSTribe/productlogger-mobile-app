import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import ManagerStackNavigator from './ManagerStack';
import UserStackNavigator from './UserStack';

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      Manager: ManagerStackNavigator,
      User: UserStackNavigator,
    },
    {
      initialRouteName: 'User',
    })
);

export default AppContainer;