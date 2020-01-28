import { createStackNavigator } from 'react-navigation-stack';
import {
  SignupScreen
} from '../screens';

const AuthStackNavigator = createStackNavigator(
  {
    Signup: {
      screen: SignupScreen,
    },
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
    initialRouteName: 'Signup',
  }
);

export default AuthStackNavigator;