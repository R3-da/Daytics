import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { auth } from '../../firebase';

const AccountScreen = ({navigation}) => {
    let [newPassword, setNewPassword] = React.useState("");
    let [currentPassword, setCurrentPassword] = React.useState("");
    let [errorMessage, setErrorMessage] = React.useState("");

    const handleChangePassword = () => {
        // Implement logic to change password
        auth.currentUser.updatePassword(newPassword).then(() => {
            setNewPassword("");
            setErrorMessage("");
            setCurrentPassword("");
        }).catch((error) => {
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

    return (
        <View style={styles.container}>
            <Ionicons name="person-circle-outline" size={150} color="gray" />
                <Text style={styles.title}>{auth.currentUser.email}</Text>
            <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
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
    fontWeight:'bold',
    fontSize:15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccountScreen;
