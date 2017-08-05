import {
  TabNavigator,
} from 'react-navigation';
import Main from './Main.js';
import Settings from './Settings.js';
import colors from './colors.js';

const App = TabNavigator({
  Home: {
    screen: Main,
  },
  Notifications: {
    screen: Settings,
  },
  }, {
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: colors.Dark,
      },
      style: {
        backgroundColor: colors.Light,
      },
    },
    tabBarPosition: 'bottom',
  });


export default App;
