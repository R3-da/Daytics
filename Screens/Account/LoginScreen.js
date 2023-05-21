import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AppStyles from '../../Styles/AppStyles';
import SignUpPopUp from './SignUpPopUp';
import ResetPasswordPopUp from './ResetPasswordPopUp'
import { auth } from "../../firebase";
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);
  const [isResetPasswordVisible, setIsResetPasswordVisible] = useState(false);
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState("");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
    if (email !== "" && password !== "") {
      auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.navigate("AccountScreen");
          setErrorMessage("");
          setEmail("");
          setPassword("");
        })
        .catch((error) => {
          setErrorMessage(error.message)
        });
    } else {
      setErrorMessage("Please enter an email and password");
    }
  };

  const openSignUpPopUp = () => {
    setIsSignUpVisible(true);
  };

  const closeSignUpPopUp = () => {
    setIsSignUpVisible(false);
  };

  const openResetPasswordPopUp = () => {
    // Implement your forgot password logic here
    setIsResetPasswordVisible(true)
  };

  const closeResetPasswordPopUp = () => {
    // Implement your forgot password logic here
    setIsResetPasswordVisible(false)
  };

  return (
    <View style={AppStyles.accountContainer}>
      <View style={AppStyles.loginInputContainer}>
        <TextInput
          style={AppStyles.loginInputText}
          placeholder="Email"
          placeholderTextColor='#aaaaaa'
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
        />
      </View>
      
      <View style={AppStyles.loginInputContainer}>
        <TextInput
          style={AppStyles.loginInputText}
          placeholder="Password"
          placeholderTextColor='#aaaaaa'
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
          autoCapitalize='none'
        />
      </View>

      <Text >{errorMessage}</Text>

      <TouchableOpacity style={AppStyles.loginButton} onPress={handleLogin}>
        <Text style={AppStyles.loginButtonText} >Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={AppStyles.signUpButton} onPress={openSignUpPopUp}>
        <Text style={AppStyles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
      
      <SignUpPopUp isVisible={isSignUpVisible} onClose={closeSignUpPopUp} />

      <TouchableOpacity style={AppStyles.forgotPasswordButton} onPress={openResetPasswordPopUp}>
        <Text style={AppStyles.forgotPasswordButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

      <ResetPasswordPopUp navigation={navigation} isVisible={isResetPasswordVisible} onClose={closeResetPasswordPopUp} />
    </View>
  );
};

export default LoginScreen;
