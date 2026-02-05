import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { auth } from '../services/firebase';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      async register(email: string, password: string) {
        await createUserWithEmailAndPassword(auth, email, password);
      },
      async login(email: string, password: string) {
        await signInWithEmailAndPassword(auth, email, password);
      },
      async logout() {
        await signOut(auth);
      }
    }),
    [isLoading, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
