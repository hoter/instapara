import { StackNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Photo from '../screens/Photo';

const Router = StackNavigator({
  home: {
    screen: Home
  },
  photo: {
    screen: Photo
  }
});

export default Router;
