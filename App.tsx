import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
// import { Navigation } from './src/navigator/Navigation';
import { Tabs } from './src/navigator/Tabs';

const App = () => {
  return (
    <NavigationContainer>
      <Tabs />
      {/* <Navigation /> */}
    </NavigationContainer>
  );
};

export default App;
