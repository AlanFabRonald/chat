import { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { getProfile, upsertProfile } from '../services/profileService';
import { UserProfile } from '../types/models';

const defaultProfile = (id: string): UserProfile => ({
  id,
  name: '',
  age: 21,
  bio: '',
  interests: [],
  createdAt: Date.now()
});

export function ProfileScreen() {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [interestsInput, setInterestsInput] = useState('');

  useEffect(() => {
    async function bootstrapProfile() {
      if (!user) {
        return;
      }

      const existing = await getProfile(user.uid);
      const startingProfile = existing ?? defaultProfile(user.uid);
      setProfile(startingProfile);
      setInterestsInput(startingProfile.interests.join(', '));
    }

    bootstrapProfile();
  }, [user]);

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading profile…</Text>
      </SafeAreaView>
    );
  }

  async function handleSave() {
    const cleaned: UserProfile = {
      ...profile,
      interests: interestsInput
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    };

    await upsertProfile(cleaned);
    setProfile(cleaned);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Your Profile</Text>
      <TextInput
        placeholder="Name"
        style={styles.input}
        value={profile.name}
        onChangeText={(name) => setProfile((current) => (current ? { ...current, name } : current))}
      />
      <TextInput
        placeholder="Age"
        keyboardType="number-pad"
        style={styles.input}
        value={String(profile.age)}
        onChangeText={(age) =>
          setProfile((current) => (current ? { ...current, age: Number(age) || current.age } : current))
        }
      />
      <TextInput
        placeholder="Bio"
        style={[styles.input, styles.bioInput]}
        multiline
        value={profile.bio}
        onChangeText={(bio) => setProfile((current) => (current ? { ...current, bio } : current))}
      />
      <TextInput
        placeholder="Interests (comma separated)"
        style={styles.input}
        value={interestsInput}
        onChangeText={setInterestsInput}
      />
      <View style={styles.row}>
        <Pressable style={[styles.button, styles.saveButton]} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.logoutButton]} onPress={logout}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    gap: 12,
    backgroundColor: '#fff'
  },
  heading: { fontSize: 30, fontWeight: '700', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  bioInput: { minHeight: 100, textAlignVertical: 'top' },
  row: { flexDirection: 'row', gap: 12, marginTop: 4 },
  button: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 12
  },
  saveButton: { backgroundColor: '#ef476f' },
  logoutButton: { backgroundColor: '#6b7280' },
  buttonText: { color: '#fff', fontWeight: '700' }
});
