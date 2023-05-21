import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Animated } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { firebase } from "../../firebase";
import "firebase/auth";
import DeleteAccountPopUp from './DeleteAccountPopUp';
import AppStyles from '../../Styles/AppStyles';

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
        credential = firebase.auth.EmailAuthProvider.credential(
            firebase.auth().currentUser.email,
            currentPassword
        );
        firebase.auth().currentUser.reauthenticateWithCredential(credential)
            .then(() => {
                if (newPassword === confirmNewPassword) {
                    firebase.auth().currentUser
                    .updatePassword(newPassword)
                    .then(() => {
                        setNewPassword('');
                        setErrorMessage('');
                        setCurrentPassword('');
                        setConfirmNewPassword('');
                        toggleInputs();
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
        firebase.auth().signOut();
        navigation.popToTop();
    };

    const validateAndSet = (value, valueToCompare, setValue) => {
        if (value !== valueToCompare) {
        setMissMatchMessage("Passwords do not match.");
        } else {
        setMissMatchMessage("");
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
        <View style={AppStyles.accountScreenContainer}>
            <Ionicons name="person-circle-outline" size={150} color="gray" style={AppStyles.accountLogo} />
            <Text style={AppStyles.accountTitle}>{firebase.auth().currentUser.email}</Text>

            {!showInputs && (
                <TouchableOpacity style={AppStyles.changePasswordButton} onPress={toggleInputs}>
                <Text style={AppStyles.accountButtonText}>Change Password</Text>
                </TouchableOpacity>
            )}

            {showInputs && (
                <>
                <View style={AppStyles.changePasswordInputContainer}>
                    <TextInput
                    style={AppStyles.changePasswordInput}
                    placeholder="Current Password"
                    secureTextEntry
                    value={currentPassword}
                    onChangeText={(value) => 
                        validateAndSet(value, confirmNewPassword, setCurrentPassword, '')
                        }
                    />
                    <TextInput
                    style={AppStyles.changePasswordInput}
                    placeholder="New Password"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={(value) => 
                        validateAndSet(value, confirmNewPassword, setNewPassword, '')
                        }
                    />
                    <TextInput
                    style={AppStyles.changePasswordInput}
                    placeholder="Confirm Password"
                    secureTextEntry
                    value={confirmNewPassword}
                    onChangeText={(value) => 
                        validateAndSet(value, newPassword, setConfirmNewPassword, '')
                        }
                    />
                </View>
                <TouchableOpacity style={AppStyles.changePasswordButton} onPress={handleChangePassword}>
                    <Text style={AppStyles.accountButtonText}>Save Password</Text>
                </TouchableOpacity>

                <TouchableOpacity style={AppStyles.cancelButton} onPress={toggleInputs}>
                    <Text style={AppStyles.accountButtonText}>Cancel</Text>
                </TouchableOpacity>
                </>
            )}

            <TouchableOpacity style={AppStyles.logOutButton} onPress={handleLogOut}>
                <Text style={AppStyles.accountButtonText}>Log Out</Text>
            </TouchableOpacity>

            <TouchableOpacity style={AppStyles.deleteButton} onPress={openDeleteAccountPopup}>
                <Text style={AppStyles.accountButtonText}>Delete Account</Text>
            </TouchableOpacity>

            <DeleteAccountPopUp navigation={navigation} isVisible={isDeleteAccountVisible} onClose={closeDeleteAccountPopup} />
            
        </View>
    );
};

export default AccountScreen;
