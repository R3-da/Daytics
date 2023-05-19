import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AppStyles from '../../Styles/AppStyles';

const AccountScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
  };

  const handleSignUp = () => {
    // Implement your sign up logic here
  };

  const handleForgotPassword = () => {
    // Implement your forgot password logic here
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

      <TouchableOpacity style={AppStyles.loginButton} onPress={handleLogin}>
        <Text style={AppStyles.loginButtonText} >Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={AppStyles.signUpButton} onPress={handleSignUp}>
        <Text style={AppStyles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={AppStyles.forgotPasswordButton} onPress={handleForgotPassword}>
        <Text style={AppStyles.forgotPasswordButtonText}>Forgot Password?</Text>
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
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  input: {
    width: '80%',
    height: 48,
    borderRadius: 8,
    backgroundColor: '#F2F2F2',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  loginButton: {
    width: '80%',
    height: 48,
    borderRadius: 8,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    width: '80%',
    height: 48,
    borderRadius: 8,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    marginBottom: 16,
  },
  forgotPasswordButtonText: {
    fontSize: 14,
    color: '#888888',
  },
});

export default AccountScreen;
