import { createStackNavigator } from 'react-navigation-stack';
import { ManagerHomeScreen, AddUserScreen, UserDetailScreen } from '../screens';

const ManagerStackNavigator = createStackNavigator(
  {
    ManagerHome: {
      screen: ManagerHomeScreen,
    },
    AddUser: {
      screen: AddUserScreen,
    },
    UserDetail: {
      screen: UserDetailScreen,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
    initialRouteName: 'ManagerHome',
  },
);

export default ManagerStackNavigator;
