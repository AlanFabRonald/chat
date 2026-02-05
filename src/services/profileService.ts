import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where
} from 'firebase/firestore';
import { db } from './firebase';
import { MatchAction, MatchRecord, UserProfile } from '../types/models';

const PROFILES_COLLECTION = 'profiles';
const ACTIONS_COLLECTION = 'actions';

export async function upsertProfile(profile: UserProfile) {
  await setDoc(doc(db, PROFILES_COLLECTION, profile.id), profile, { merge: true });
}

export async function getProfile(userId: string) {
  const snapshot = await getDoc(doc(db, PROFILES_COLLECTION, userId));
  return snapshot.exists() ? (snapshot.data() as UserProfile) : null;
}

export async function listCandidates(currentUserId: string) {
  const profileSnapshots = await getDocs(collection(db, PROFILES_COLLECTION));
  const actionSnapshots = await getDocs(
    query(collection(db, ACTIONS_COLLECTION), where('fromUserId', '==', currentUserId))
  );

  const alreadyActed = new Set(actionSnapshots.docs.map((item) => item.data().toUserId));

  return profileSnapshots.docs
    .map((item) => item.data() as UserProfile)
    .filter((profile) => profile.id !== currentUserId && !alreadyActed.has(profile.id));
}

export async function saveMatchAction(fromUserId: string, toUserId: string, action: MatchAction) {
  const payload: MatchRecord = {
    fromUserId,
    toUserId,
    action,
    createdAt: Date.now()
  };

  await setDoc(doc(db, ACTIONS_COLLECTION, `${fromUserId}_${toUserId}`), payload);
}
