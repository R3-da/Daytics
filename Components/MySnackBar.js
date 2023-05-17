import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';

const MySnackBar = ({ visible, onDismiss, snackBarMessage, undoDeleteTodo }) => (
  <Snackbar
    visible={visible}
    onDismiss={onDismiss}
    duration={3000}
    style={styles.snackbar}
    action={{
      label: 'Undo',
      onPress: undoDeleteTodo,
    }}
  >
    <View style={styles.content}>
      <FontAwesome name="info-circle" color="white" size={18} style={styles.icon} />
      <Text style={styles.message}>{snackBarMessage}</Text>
    </View>
  </Snackbar>
);

const styles = StyleSheet.create({
  snackbar: {
    backgroundColor: 'gray',
    borderRadius: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  message: {
    color: 'white',
    fontSize: 14,
  },
});

export default MySnackBar;
