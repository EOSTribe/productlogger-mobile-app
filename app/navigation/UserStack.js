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
    ProductDetail: {
      screen: ProductDetailScreen,
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
