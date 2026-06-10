console.log("web-entry.js loaded!");
import { AppRegistry } from 'react-native';
import App from './App';
import appJson from './app.json';

try {
  console.log("Registering component:", appJson.name);
  AppRegistry.registerComponent(appJson.name, () => App);

  console.log("Running application...");
  AppRegistry.runApplication(appJson.name, {
    initialProps: {},
    rootTag: document.getElementById('root'),
  });
  console.log("Application mounted successfully!");
} catch (e) {
  console.error("Mounting error:", e);
}
