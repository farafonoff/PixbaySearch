import React from 'react';
import {store} from './src/store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import SearchScreen from './src/pages/SearchScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailScreen from './src/pages/DetailScreen';
import { RootStackParamList } from './src/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Search">
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="ImageView" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
