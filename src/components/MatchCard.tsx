import { Pressable, StyleSheet, Text, View } from 'react-native';
import { UserProfile } from '../types/models';

type MatchCardProps = {
  profile: UserProfile;
  onPass: () => Promise<void>;
  onLike: () => Promise<void>;
};

export function MatchCard({ profile, onPass, onLike }: MatchCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.photoPlaceholder}>
        <Text style={styles.placeholderText}>Photo</Text>
      </View>
      <Text style={styles.name}>{profile.name}, {profile.age}</Text>
      <Text style={styles.bio}>{profile.bio}</Text>
      <View style={styles.interestRow}>
        {profile.interests.map((interest) => (
          <View style={styles.tag} key={interest}>
            <Text style={styles.tagText}>{interest}</Text>
          </View>
        ))}
      </View>
      <View style={styles.actions}>
        <Pressable style={[styles.button, styles.passButton]} onPress={onPass}>
          <Text style={styles.buttonText}>Pass</Text>
        </Pressable>
        <Pressable style={[styles.button, styles.likeButton]} onPress={onLike}>
          <Text style={styles.buttonText}>Like</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3
  },
  photoPlaceholder: {
    height: 250,
    borderRadius: 12,
    backgroundColor: '#ffe4e6',
    alignItems: 'center',
    justifyContent: 'center'
  },
  placeholderText: { color: '#9f1239', fontWeight: '700' },
  name: { fontSize: 26, fontWeight: '700' },
  bio: { color: '#4b5563', lineHeight: 20 },
  interestRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#fce7f3',
    borderRadius: 999
  },
  tagText: { color: '#9d174d', fontWeight: '600' },
  actions: { flexDirection: 'row', gap: 12, marginTop: 8 },
  button: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 12
  },
  passButton: { backgroundColor: '#e5e7eb' },
  likeButton: { backgroundColor: '#ef476f' },
  buttonText: { color: '#111827', fontWeight: '700' }
});
