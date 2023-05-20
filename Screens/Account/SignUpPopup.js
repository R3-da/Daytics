import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Animated, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SignUpPopup = ({ isVisible, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [containerOpacity] = useState(new Animated.Value(0)); // Initialize container opacity value
  const [contentOpacity] = useState(new Animated.Value(0)); // Initialize content opacity value

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

  const handleSignUp = () => {
    // Implement your sign-up logic here
    // You can access the entered email, password, and confirmPassword values
    // Validate the input and perform the necessary actions, such as making an API call to register the user
  };

  const handleClose = () => {
    // Fade out animation when closing the pop-up
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
    ]).start(onClose);
  };

  const handleOverlayClick = () => {
    // Close the pop-up when clicking outside
    handleClose();
  };

  return (
    <Modal visible={isVisible} transparent onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={handleOverlayClick}>
        <Animated.View style={[styles.container, { opacity: containerOpacity }]}>
          <Animated.View style={[styles.content, { opacity: contentOpacity }]}>
            <View style={styles.signUpTitleContainer}>
              <Text style={styles.title}>Sign Up</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={setEmail}
              value={email}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={setPassword}
              value={password}
              secureTextEntry
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
              <Ionicons name="close-outline" size={25} color="gray" />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  content: {
    width: '80%',
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#788eec',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 5,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  closeIcon: {
    color: 'gray',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 0, // Remove padding around the close icon
    margin: 0, // Remove margin around the close icon
  },
  signUpTitleContainer: {
    width: '100%',
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Center items vertically
    justifyContent: 'center', // Push items to the start and end
  },
};

export default SignUpPopup;
