/**
 * Copy values from Firebase Console → Project settings → Your apps → Web app.
 * Also add your production domain under Authentication → Settings → Authorized domains.
 *
 * Firestore: create collection "member_allowlist" with one document per member.
 * Document ID must be the member's Google sign-in email exactly (e.g. user@gmail.com).
 * Document can be empty {} — existence is what grants access.
 *
 * Firestore rules (Console → Firestore → Rules): see firestore.rules in this repo.
 */
window.AWFC_FIREBASE_CONFIG = {
  apiKey: 'AIzaSyCkM5skq6QSh-fh2GIv0rrk-8pyEofFh7s',
  authDomain: 'albert-whitted-flying-club.firebaseapp.com',
  projectId: 'albert-whitted-flying-club',
  storageBucket: 'albert-whitted-flying-club.firebasestorage.app',
  messagingSenderId: '60594631094',
  appId: '1:60594631094:web:ec897208ba49e0c8f3d117'
};

/** Members-only links (e.g. Google Doc for meeting notes). Update after you create the doc. */
window.AWFC_PORTAL_LINKS = {
  meetingNotes: 'https://docs.google.com/document/d/REPLACE_WITH_YOUR_DOC_ID/edit'
};
