import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

type AuthFormProps = {
  onSubmit: (email: string, password: string) => Promise<void>;
  mode: 'login' | 'register';
  onToggleMode: () => void;
};

export function AuthForm({ onSubmit, mode, onToggleMode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit() {
    try {
      setError('');
      await onSubmit(email.trim(), password.trim());
    } catch (submissionError) {
      setError('Unable to authenticate. Verify credentials and try again.');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{mode === 'login' ? 'Welcome back' : 'Create account'}</Text>
      <TextInput
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
        value={email}
      />
      <TextInput
        secureTextEntry
        placeholder="Password"
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
      <Pressable style={styles.primaryButton} onPress={handleSubmit}>
        <Text style={styles.primaryText}>{mode === 'login' ? 'Sign in' : 'Sign up'}</Text>
      </Pressable>
      <Pressable onPress={onToggleMode}>
        <Text style={styles.secondaryText}>
          {mode === 'login' ? 'Need an account? Register' : 'Already registered? Login'}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', gap: 12 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  primaryButton: {
    marginTop: 6,
    backgroundColor: '#ef476f',
    borderRadius: 10,
    alignItems: 'center',
    padding: 12
  },
  primaryText: { color: '#fff', fontWeight: '700' },
  secondaryText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 10,
    fontWeight: '500'
  },
  error: { color: '#dc2626' }
});
