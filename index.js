import {AppRegistry} from 'react-native';
import DefaultApp from './DefaultApp';
import {name as appName} from './app.json';
import App from './src/App';

AppRegistry.registerComponent(appName, () => App);
