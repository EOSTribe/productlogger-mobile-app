import { createStackNavigator } from 'react-navigation-stack';
import {
  ManagerHomeScreen,
  AddUserScreen,
  UserDetailScreen,
  ProductDetailScreen,
} from '../screens';

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
    ProductDetail: {
      screen: ProductDetailScreen,
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
