
import React, { type PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './navigations/AppStack';


const App = () => {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default App;
