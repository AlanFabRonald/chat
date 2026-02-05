# SparkMatch (React Native + Firebase)

A starter dating app built with **React Native (Expo)** and **Firebase**.

## Features
- Email/password authentication with Firebase Auth.
- Profile setup/editing (name, age, bio, interests) saved in Firestore.
- Discover feed that shows other profiles.
- Like/pass actions stored in Firestore.

## Tech stack
- Expo + React Native + TypeScript
- React Navigation (stack + bottom tabs)
- Firebase Auth + Firestore

## 1) Install dependencies
```bash
npm install
```

## 2) Configure Firebase
1. Create a Firebase project.
2. Enable **Authentication > Email/Password**.
3. Create a **Cloud Firestore** database.
4. Copy `.env.example` to `.env` and replace values with your Firebase config.

```bash
cp .env.example .env
```

Expo automatically exposes `EXPO_PUBLIC_*` environment variables to the app.

## 3) Run
```bash
npm run start
```

Then open on iOS/Android simulator, Expo Go, or web.

## Firestore collections
- `profiles/{uid}`: user profile.
- `actions/{fromUserId_toUserId}`: like/pass action.

## Suggested Firestore rules (starter)
```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /profiles/{userId} {
      allow read: if request.auth != null;
      allow create, update: if request.auth != null && request.auth.uid == userId;
    }

    match /actions/{actionId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Next improvements
- Add image upload via Firebase Storage.
- Real match logic when two users like each other.
- Push notifications and in-app chat.
