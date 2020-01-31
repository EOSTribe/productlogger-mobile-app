import { createStackNavigator } from 'react-navigation-stack';
import { UserHomeScreen, AddProductScreen, AddRecordScreen } from '../screens';

const UserStackNavigator = createStackNavigator(
  {
    UserHome: {
      screen: UserHomeScreen,
    },
    AddProduct: {
      screen: AddProductScreen,
    },
    AddRecord: {
      screen: AddRecordScreen,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
    initialRouteName: 'UserHome',
  },
);

export default UserStackNavigator;
