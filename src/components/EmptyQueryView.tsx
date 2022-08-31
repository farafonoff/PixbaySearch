import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const EmptyQueryView = () => {
  return (
    <SafeAreaView style={style.container}>
      <Text>Start typing to search for images</Text>
    </SafeAreaView>
  );
};

export default EmptyQueryView;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {},
});
