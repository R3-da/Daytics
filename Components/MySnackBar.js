import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';

const MySnackBar = ({ visible, onDismiss, snackBarMessage, addTodo }) => (
  <Snackbar style={styles.container} visible={visible} onDismiss={onDismiss} duration={3000}>
    <View style={styles.innerContainer}>
      <FontAwesome 
        name='info-circle' 
        color='white' 
        style={styles.infoIcon} 
      />
      <Text style={styles.text}>{snackBarMessage}</Text>
      <FontAwesome
        name='undo'
        color='white'
        style={styles.undoButton}
        onPress={() => {
          addTodo;
        }}
      />
    </View>
  </Snackbar>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    backgroundColor: 'gray',
    borderRadius: 15,
    height: 30, // Adjust the height value as needed
    paddingHorizontal: 16, // Adjust the padding value as needed
    justifyContent: 'center', // Center items vertically
    alignItems: 'center', // Center items horizontally
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: 'white',
    fontSize: 15,
  },
  undoButton: {
    fontSize:15
  },
  infoIcon: {
    fontSize:17
  },
});

export default MySnackBar;
