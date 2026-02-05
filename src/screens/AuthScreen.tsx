import { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { AuthForm } from '../components/AuthForm';
import { useAuth } from '../hooks/useAuth';

export function AuthScreen() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <SafeAreaView style={styles.container}>
      <AuthForm
        mode={mode}
        onSubmit={mode === 'login' ? login : register}
        onToggleMode={() => setMode((currentMode) => (currentMode === 'login' ? 'register' : 'login'))}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});
