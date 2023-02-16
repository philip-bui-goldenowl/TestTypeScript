
import React, { type PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './navigations/AppStack';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apollo';
import { Provider } from 'react-redux';
import store from './store';


const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
