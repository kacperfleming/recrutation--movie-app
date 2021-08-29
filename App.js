import React from 'react';
import {Provider} from 'react-redux';

import store from './store';
import StackNavigator from './navigator/StackNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <StackNavigator />
    </Provider>
  );
};

export default App;
