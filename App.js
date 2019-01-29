import React from 'react';
import { ScreenOrientation } from 'expo';
import { Provider } from 'mobx-react';
import Home from './components/home';
import { AppStore } from './stores';

const { LANDSCAPE } = ScreenOrientation.Orientation;
const appStore = new AppStore();

appStore.loadAppState();
ScreenOrientation.allowAsync(LANDSCAPE);

export default App = () => (
  <Provider appStore={appStore}>
    <Home />
  </Provider>
);