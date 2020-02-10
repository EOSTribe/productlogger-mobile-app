import { createStackNavigator } from 'react-navigation-stack';
import {
  UserHomeScreen,
  AddProductScreen,
  AddRecordScreen,
  ScannerScreen,
} from '../screens';

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
    Scanner: {
      screen: ScannerScreen,
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
