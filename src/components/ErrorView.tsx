import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTriangleExclamation} from '@fortawesome/free-solid-svg-icons/faTriangleExclamation';

const ErrorView = () => {
  return (
    <SafeAreaView style={style.container}>
      <FontAwesomeIcon
        size={200}
        style={style.icon}
        icon={faTriangleExclamation}
      />
      <Text>No internet connection</Text>
    </SafeAreaView>
  );
};

export default ErrorView;

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {},
});
