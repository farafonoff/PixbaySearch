import React from 'react';
import {store} from './store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import SearchScreen from './pages/SearchScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailScreen from './pages/DetailScreen';
import {RootStackParamList} from './navigation';

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
