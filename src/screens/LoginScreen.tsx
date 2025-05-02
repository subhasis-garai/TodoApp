// This code is a React Native login screen component that uses hooks for state management. It includes a custom status bar, input fields for username and password, and a button to submit the login form. If the credentials are incorrect, an error message is displayed. The component also uses a custom hook for authentication logic.
// The styles are defined using StyleSheet for better performance and readability. The component is designed to be responsive and user-friendly, with clear error handling and input validation.

import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import CustomStatusBar from '../components/CustomStatusBar';
import { AUTH_CREDENTIALS } from '../constants/auth';

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
      <CustomStatusBar backgroundColor="#1e90ff" barStyle="light-content" />
      <View style={styles.container}>
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setError('');
          }}
          style={styles.input}
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
        />
        {error !== '' && <Text style={styles.error}>{error}</Text>}
        <Button title="Login" onPress={handleLogin} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderColor: '#ccc', borderRadius: 5 },
  error: { color: 'red', marginBottom: 10, textAlign: 'center' },
});

export default LoginScreen;
