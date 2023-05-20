import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth } from '../../firebase';

const AccountScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showInputs, setShowInputs] = useState(false);

  const handleChangePassword = () => {
    // Implement logic to change password
    auth.currentUser
      .updatePassword(newPassword)
      .then(() => {
        setNewPassword('');
        setErrorMessage('');
        setCurrentPassword('');
        setConfirmPassword('');
        setShowInputs(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const handleLogOut = () => {
    // Implement logic to sign out the user
    navigation.goBack();
    auth.signOut();
  };

  const handleDeleteAccount = () => {
    // Implement logic to delete the user account
  };

  const toggleInputs = () => {
    setShowInputs(!showInputs);
  };

  return (
    <View style={styles.container}>
      <Ionicons name="person-circle-outline" size={150} color="gray" style={styles.logo} />
      <Text style={styles.title}>{auth.currentUser.email}</Text>

      {!showInputs && (
        <TouchableOpacity style={styles.button} onPress={toggleInputs}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
      )}

      {showInputs && (
        <>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              secureTextEntry
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
            <Text style={styles.buttonText}>Save Password</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={toggleInputs}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleLogOut}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 20,
  },
  logo: {
    opacity: 0.5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
    marginBottom: 10,
    paddingVertical: 5,
    width: '80%',
  },
  inputContainer: {
    width: '80%',
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AccountScreen;
