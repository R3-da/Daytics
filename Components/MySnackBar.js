import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';

const MySnackBar = ({ visible, onDismiss, snackBarMessage}) => (
  <Snackbar style={styles.container} visible={visible} onDismiss={onDismiss} duration={3000}>
    <Text style={styles.container}>{snackBarMessage}</Text>
    <Button onPress={onDismiss}>Dismiss</Button>
  </Snackbar>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'gray',
    padding: 16,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
});

export default MySnackBar;