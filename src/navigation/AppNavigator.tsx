import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import TodoListScreen from '../screens/TodoListScreen';
import { useAuth } from '../hooks/useAuth';
import { RootStackParamList } from '../types/Navigation';


const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
const { isLoggedIn } = useAuth();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="TodoList" component={TodoListScreen} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
