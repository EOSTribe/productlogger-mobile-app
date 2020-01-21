import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import ManagerStackNavigator from './ManagerStackNavigator';

const AppContainer = createAppContainer(
  createSwitchNavigator({
    Manager: ManagerStackNavigator,
  })
);

export default AppContainer;