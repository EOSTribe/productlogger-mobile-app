import { createStackNavigator } from 'react-navigation-stack';
import { ManagerHomeScreen } from '../screens/ManagerHome';

const ManagerStackNavigator = createStackNavigator(
  {
    ManagerHome: {
      screen: ManagerHomeScreen,
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