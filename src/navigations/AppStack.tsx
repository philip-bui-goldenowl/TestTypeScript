import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenName } from '@/constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BottomTabView from '@/components/BottomTab';
import HomeScreen from '@/containers/Home';
import { MainStackParamList, RootStackParamList } from '@/types/stack';
import SearchScreen from '@/containers/Search';
import LoginScreen from '@/containers/Login';
import SplashScreen from '@/containers/Splash';
import Profile from '@/containers/Profile';
import UpdatePassword from '@/containers/Profile/UpdatePassword';
import Phone from '@/containers/Profile/Phone';
import ProductDetail from '@/containers/ProductDetail';


const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainStackParamList>();
const AppStack = () => {

  const MainTab = () => {
    return (
      <Tab.Navigator
        initialRouteName={ScreenName.HOME}
        tabBar={(props) => <BottomTabView {...props} />}
      >
        <Tab.Screen name={ScreenName.HOME} component={HomeScreen} options={{ title: 'Home', headerShown: false }} />
        <Tab.Screen name={ScreenName.PROFILE} component={Profile} options={{ title: 'Profile', headerShown: false }} />
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
      <RootStack.Screen name={ScreenName.SPLASH_SCREEN} component={SplashScreen} />
      <RootStack.Screen name={ScreenName.LOGIN} component={LoginScreen} />
      <RootStack.Screen name={ScreenName.MAIN_TAB} component={MainTab} />
      <RootStack.Screen name={ScreenName.SEARCH} component={SearchScreen} />
      <RootStack.Screen name={ScreenName.UPDATE_PASSWORD} component={UpdatePassword} />
      <RootStack.Screen name={ScreenName.PHONE} component={Phone} />
      <RootStack.Screen name={ScreenName.PRODUCT_DETAIL} component={ProductDetail} />
    </RootStack.Navigator>
  );
};

export default AppStack;