import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { MatchCard } from '../components/MatchCard';
import { useAuth } from '../hooks/useAuth';
import { listCandidates, saveMatchAction } from '../services/profileService';
import { UserProfile } from '../types/models';

export function DiscoverScreen() {
  const { user } = useAuth();
  const [candidates, setCandidates] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentProfile = useMemo(() => candidates[0] ?? null, [candidates]);

  const loadCandidates = useCallback(async () => {
    if (!user) {
      return;
    }

    setIsLoading(true);
    const items = await listCandidates(user.uid);
    setCandidates(items);
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    loadCandidates();
  }, [loadCandidates]);

  async function handleAction(action: 'liked' | 'passed') {
    if (!user || !currentProfile) {
      return;
    }

    await saveMatchAction(user.uid, currentProfile.id, action);
    setCandidates((existing) => existing.slice(1));
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.title}>Discover</Text>
      {isLoading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      ) : currentProfile ? (
        <MatchCard profile={currentProfile} onPass={() => handleAction('passed')} onLike={() => handleAction('liked')} />
      ) : (
        <View style={styles.center}>
          <Text style={styles.emptyTitle}>No more profiles right now.</Text>
          <Text style={styles.emptyText}>Invite more users or update your filters later.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8fafc',
    gap: 14
  },
  title: { fontSize: 30, fontWeight: '700' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 8 },
  emptyTitle: { fontSize: 20, fontWeight: '700' },
  emptyText: { color: '#6b7280' }
});
