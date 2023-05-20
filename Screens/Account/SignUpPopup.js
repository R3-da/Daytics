import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Animated, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppStyles from '../../Styles/AppStyles';
import { firebase, auth } from "../../firebase";

const SignUpPopup = ({ isVisible, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const validateAndSet = (value, valueToCompare, setValue) => {
    if (value !== valueToCompare) {
      setValidationMessage("Passwords do not match.");
    } else {
      setValidationMessage("");
    }
    setValue(value);
  };

  const handleSignUp = () => {
    // Implement your sign-up logic here
    // You can access the entered email, password, and confirmPassword values
    // Validate the input and perform the necessary actions, such as making an API call to register the user
    if (password === confirmPassword) {
      auth.createUserWithEmailAndPassword(email , password)
        .then((userCredential)=>{
          userCredential.user.sendEmailVerification();
          auth.signOut();
          handleClose();
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setValidationMessage('Email Verification Is Sent');
        })
        .catch((error) => {
          setValidationMessage(error.message);
        });
    }
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
                <Text style={AppStyles.signUptitle}>Sign Up</Text>
              </View>
              <TextInput
                style={AppStyles.popInput}
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
              />
              <TextInput
                style={AppStyles.popInput}
                placeholder="Password"
                onChangeText={(value) => validateAndSet(value, confirmPassword, setPassword)}
                value={password}
                secureTextEntry
              />
              <TextInput
                style={AppStyles.popInput}
                placeholder="Confirm Password"
                onChangeText={(value) => validateAndSet(value, password, setConfirmPassword)}
                value={confirmPassword}
                secureTextEntry
              />
              <Text >{validationMessage}</Text>
              <TouchableOpacity style={AppStyles.createAccountButton} onPress={handleSignUp}>
                <Text style={AppStyles.createAccountButtonText}>Create Account</Text>
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

export default SignUpPopup;
