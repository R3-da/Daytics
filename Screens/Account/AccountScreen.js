import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth } from '../../firebase';
import DeleteAccountPopUp from './DeleteAccountPopUp';

const AccountScreen = ({ navigation }) => {
    const [isDeleteAccountVisible, setIsDeleteAccountVisible] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showInputs, setShowInputs] = useState(false);
    const [missMatchMessage, setMissMatchMessage] = useState('')

    const handleChangePassword = () => {
        // Implement logic to change password
        credential = auth.EmailAuthProvider.credential(
            auth.currentUser.email,
            currentPassword
        );
        auth.currentUser.reauthenticateWithCredential(credential)
            .then(() => {
                if (newPassword === confirmNewPassword) {
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
                } else {
                    setMissMatchMessage('missmatch')
                }
            }).catch((error) => {
                setErrorMessage(error.message);
                setMissMatchMessage('wrong account password')
            });   
    };

    const handleLogOut = () => {
        // Implement logic to sign out the user
        navigation.goBack();
        auth.signOut();
    };

    const validateAndSet = (value, valueToCompare, setValue) => {
        if (value !== valueToCompare) {
        setValidationMessage("Passwords do not match.");
        } else {
        setValidationMessage("");
        }
        setValue(value);
    };

    const openDeleteAccountPopup = () => {
        setShowInputs(false);
        setIsDeleteAccountVisible(true);
      };
    
      const closeDeleteAccountPopup = () => {
        setIsDeleteAccountVisible(false);
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
                <Text>{}</Text>
                <TextInput
                style={styles.input}
                placeholder="Current Password"
                secureTextEntry
                value={currentPassword}
                onChangeText={(value) => 
                    validateAndSet(value, confirmNewPassword, setCurrentPassword, '')
                    }
                />
                <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={(value) => 
                    validateAndSet(value, confirmNewPassword, setNewPassword, '')
                    }
                />
                <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmNewPassword}
                onChangeText={(value) => 
                    validateAndSet(value, newPassword, setConfirmNewPassword, '')
                    }
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

        <TouchableOpacity style={styles.button} onPress={openDeleteAccountPopup}>
            <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>

        <DeleteAccountPopUp navigation={navigation} isVisible={isDeleteAccountVisible} onClose={closeDeleteAccountPopup} />
        
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
