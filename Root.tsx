import React from 'react';
import {store} from './src/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import SearchScreen from './src/SearchScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailScreen from './src/DetailScreen';
import App from './src/App';

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Search">
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Image View" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
