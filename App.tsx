import 'react-native-gesture-handler';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { TodoProvider } from './src/contexts/TodoContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <TodoProvider>
          <AppNavigator />
        </TodoProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;
