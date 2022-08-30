import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, Text} from 'react-native';

const SpinnerView = () => {
  return (
    <SafeAreaView style={style.container}>
      <ActivityIndicator />
    </SafeAreaView>
  );
};

export default SpinnerView;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {},
});
