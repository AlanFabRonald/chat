export type UserProfile = {
  id: string;
  name: string;
  age: number;
  bio: string;
  interests: string[];
  photoUrl?: string;
  createdAt: number;
};

export type MatchAction = 'liked' | 'passed';

export type MatchRecord = {
  fromUserId: string;
  toUserId: string;
  action: MatchAction;
  createdAt: number;
};
