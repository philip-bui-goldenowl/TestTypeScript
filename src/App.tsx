
import React, { type PropsWithChildren } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './navigations/AppStack';
import { ApolloProvider } from '@apollo/client';
import { client } from './utils/apollo';


const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
