import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Animated, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppStyles from '../../Styles/AppStyles';
import { firebase } from "../../firebase";
import "firebase/auth";

const DeleteAccountPopUp = ({ navigation, isVisible, onClose }) => {
    const tasks_Db_Ref = firebase.firestore().collection('tasks_db');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [containerOpacity] = useState(new Animated.Value(0)); // Initialize container opacity value
    const [contentOpacity] = useState(new Animated.Value(0)); // Initialize content opacity value
    const [validationMessage, setValidationMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (isVisible) {
        // Fade in animation when the pop-up is visible
        Animated.parallel([
            Animated.timing(containerOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
            }),
            Animated.timing(contentOpacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
            }),
        ]).start();
        }
    }, [isVisible, containerOpacity, contentOpacity]);

    const handleDeleteAccount = () => {
        // Implement logic to delete the user account
        const credential = firebase.auth.EmailAuthProvider.credential(
            firebase.auth().currentUser.email,
            confirmPassword
        );
        firebase.auth().currentUser.reauthenticateWithCredential(credential)
        .then(() => {
            // Get all todos for the user and delete
            const batch = firebase.firestore().batch();
            tasks_Db_Ref
                .where("userId", "==", firebase.auth().currentUser.uid)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        batch.delete(doc.ref);
                    });
                    batch.commit()
                        .then(() => {
                            firebase.auth().currentUser.delete()
                                .catch((error) => {
                                    setErrorMessage(error.message);
                                });
                            handleClose();
                            navigation.popToTop();
                        })
                        .catch((error) => {
                            setErrorMessage(error.message);
                        });
                })
                .catch((error) => {
                    setErrorMessage(error.message);
                });
            })
        .catch((error) => {
            setErrorMessage(error.message); 
        });
        
    };

    const handleClose = () => {
        Animated.parallel([
        Animated.timing(containerOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }),
        Animated.timing(contentOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }),
        ]).start(() => {
        onClose(); // Call the onClose callback to close the sign-up popup
        });
    };

    const handleOverlayClick = () => {
        handleClose();
    };

    const handleContentClick = (e) => {
        e.stopPropagation(); // Stop the event propagation to prevent closing when clicking inside the content
    };

    return (
        <Modal visible={isVisible} transparent onRequestClose={onClose}>
        <TouchableWithoutFeedback onPress={handleOverlayClick}>
            <Animated.View style={[AppStyles.popUpContainer, { opacity: containerOpacity }]}>
            <TouchableWithoutFeedback onPress={handleContentClick}>
                <Animated.View style={[AppStyles.popUpContent, { opacity: contentOpacity }]}>
                <View style={AppStyles.signUpTitleContainer}>
                    <Text style={AppStyles.signUptitle}>Delete Account</Text>
                </View>
                <Text >Insert Your Account Password</Text>
                <TextInput
                    style={AppStyles.popInput}
                    placeholder="Password"
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                    secureTextEntry
                />
                <Text >{validationMessage}</Text>
                <TouchableOpacity style={AppStyles.createAccountButton} onPress={handleDeleteAccount}>
                    <Text style={AppStyles.createAccountButtonText}>Confirm Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={AppStyles.popUpCloseButton} onPress={handleClose}>
                    <Ionicons name="close-outline" size={25} color="gray" />
                </TouchableOpacity>
                </Animated.View>
            </TouchableWithoutFeedback>
            </Animated.View>
        </TouchableWithoutFeedback>
        </Modal>
    );
};

export default DeleteAccountPopUp;
