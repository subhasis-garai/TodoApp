// screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import CustomStatusBar from '../components/CustomStatusBar';
import { AUTH_CREDENTIALS } from '../constants/auth';
import colors from '../constants/colors';
import typography from '../constants/typography';
import AppIcon from '../components/Icon';

const LoginScreen: React.FC = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === AUTH_CREDENTIALS.USERNAME && password === AUTH_CREDENTIALS.PASSWORD) {
      setError('');
      login();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <>
      <CustomStatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={styles.container}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setError('');
          }}
          style={styles.input}
          placeholderTextColor={colors.black}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError('');
          }}
          style={styles.input}
          placeholderTextColor={colors.black}
        />
        {error !== '' && (
          <View style={styles.errorContainer}>
            <AppIcon name="error" size={20} color={colors.danger} />
            <Text style={styles.error}>{error}</Text>
          </View>
        )}
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.lightGray,
  },
  input: {
    borderWidth: 1,
    marginBottom: 15,
    padding: 12,
    borderColor: colors.gray,
    borderRadius: 5,
    fontFamily: typography.caption.fontFamily,  // Use your custom font family if needed
    fontSize: 16,
    color: colors.textPrimary,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  error: {
    color: colors.danger,
    marginLeft: 10,
    fontFamily: typography.heading.fontFamily,  // Use your custom font family if needed
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  loginButtonText: {
    fontSize: 18,
    fontFamily: typography.heading.fontFamily,  // Reference typography constants
    color: colors.white,
  },
});

export default LoginScreen;
