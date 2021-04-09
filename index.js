/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import Location from './src/screens/Locations';
// import Video from './src/screens/VideoPlayer';
import PlaylistScreen from './src/screens/AudioPlayer';

AppRegistry.registerComponent(appName, () => PlaylistScreen);
