import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import About from '@/containers/About';
import { ScreenName } from '@/constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabView from '@/components/BottomTab';
import HomeScreen from '@/containers/Home';
import { RootStackParamList } from '@/types/stack';
import SearchScreen from '@/containers/Search';


const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator<RootStackParamList>();
const AppStack = () => {

  const MainTab = () => {
    return (
      <Tab.Navigator
        initialRouteName='Home'
        tabBar={(props) => <BottomTabView {...props} />}
      >
        <Tab.Screen name={ScreenName.HOME} component={HomeScreen} options={{ title: 'Home', headerShown: false }} />
        <Tab.Screen name={ScreenName.EXPLORE} component={About} options={{ title: 'Explore', headerShown: false }} />
        {/* <Tab.Screen name={SCREEN_NAME.CartScreen} component={CartScreen} options={{ title: 'Cart' }} />
        <Tab.Screen name={SCREEN_NAME.OfferScreen} component={OfferScreen} options={{ title: 'Offer' }} /> */}
        {/* <Tab.Screen name={SCREEN_NAME.AccountScreen} component={AccountScreen} options={{ title: 'Account' }} /> */}
      </Tab.Navigator>
    );
  };
  return (
    <RootStack.Navigator
      screenOptions={
        {
          headerShown: false
        }
      }
    >
      <RootStack.Screen name={'MainTab'} component={MainTab} />
      <RootStack.Screen name={ScreenName.SEARCH} component={SearchScreen} />
      {/* <RootStack.Screen name={ScreenName.DETAIL} component={Detail} /> */}
    </RootStack.Navigator>
  );
};

export default AppStack;