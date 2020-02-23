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
      navigationOptions: {
        title: 'Manager',
      },
    },
    AddUser: {
      screen: AddUserScreen,
      navigationOptions: {
        title: 'Add New User',
      },
    },
    UserDetail: {
      screen: UserDetailScreen,
      navigationOptions: {
        title: 'User',
      },
    },
    ProductDetail: {
      screen: ProductDetailScreen,
      navigationOptions: {
        title: 'Product',
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: true,
    },
    initialRouteName: 'ManagerHome',
  },
);

export default ManagerStackNavigator;
