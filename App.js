import React from 'react';
import { ScreenOrientation } from 'expo';
import { Provider } from 'mobx-react';
import Home from './components/home';
import Stores from './stores';

ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);

export default App = () => (
  <Provider {...Stores}>
    <Home />
  </Provider>
);