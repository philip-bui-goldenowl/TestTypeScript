
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './navigations/AppStack';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apollo';
import { Provider } from 'react-redux';
import store from './store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <AppStack />
          </NavigationContainer>
        </GestureHandlerRootView>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
