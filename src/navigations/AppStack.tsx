import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import About from '@/containers/About';
import Detail from '@/containers/Detail';
import { ScreenName } from '@/constants';


const RootStack = createNativeStackNavigator();
const AppStack = () => {

  return (
    <RootStack.Navigator>
      <RootStack.Screen name={ScreenName.ABOUT} component={About} />
      <RootStack.Screen name={ScreenName.DETAIL} component={Detail} />
    </RootStack.Navigator>
  )
}

export default AppStack