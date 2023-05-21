import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Animated, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppStyles from '../../Styles/AppStyles';
import { firebase } from "../../firebase";
import "firebase/auth";

const ResetPasswordPopUp = ({navigation, isVisible, onClose }) => {
  const [email, setEmail] = useState('');
  const [containerOpacity] = useState(new Animated.Value(0)); // Initialize container opacity value
  const [contentOpacity] = useState(new Animated.Value(0)); // Initialize content opacity value
  const [validationMessage, setValidationMessage] = useState("");

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

    const resetPassword = () => {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                handleClose();
            })
            .catch((error) => {
                setValidationMessage(error.message);
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
                <Text style={AppStyles.signUptitle}>Reset Password</Text>
              </View>
              <TextInput
                style={AppStyles.popInput}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
              />
              <Text >{validationMessage}</Text>
              <TouchableOpacity style={AppStyles.createAccountButton} onPress={resetPassword}>
                <Text style={AppStyles.createAccountButtonText}>Send Reset Link</Text>
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

export default ResetPasswordPopUp;
