import { createStackNavigator } from 'react-navigation-stack';
import {
  UserHomeScreen,
  AddProductScreen,
  AddRecordScreen,
  ScannerScreen,
  ProductDetailScreen,
} from '../screens';

const UserStackNavigator = createStackNavigator(
  {
    UserHome: {
      screen: UserHomeScreen,
      navigationOptions: {
        title: 'User',
      },
    },
    AddProduct: {
      screen: AddProductScreen,
      navigationOptions: {
        title: 'Add New Product',
      },
    },
    AddRecord: {
      screen: AddRecordScreen,
      navigationOptions: {
        title: 'Add New Record',
      },
    },
    Scanner: {
      screen: ScannerScreen,
      navigationOptions: {
        headerShown: false,
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
    initialRouteName: 'UserHome',
  },
);

export default UserStackNavigator;
