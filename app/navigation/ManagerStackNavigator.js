import { createStackNavigator } from 'react-navigation-stack';
import {
  ManagerHomeScreen,
  AddUserScreen,
} from '../screens';

const ManagerStackNavigator = createStackNavigator(
  {
    ManagerHome: {
      screen: ManagerHomeScreen,
    },
    AddUser: {
      screen: AddUserScreen,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
    initialRouteName: 'ManagerHome',
  }
);

export default ManagerStackNavigator;