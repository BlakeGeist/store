import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyC4dIjnGFBM1-l7eK1704wvMSqDFCQ88Eo',
    authDomain: 'web-store-7945b.firebaseapp.com',
    databaseURL: 'https://web-store-7945b.firebaseio.com',
    projectId: 'web-store-7945b',
    storageBucket: 'web-store-7945b.appspot.com',
    messagingSenderId: '994328374920'
  })
  const firestore = firebase.firestore();
  const settings = {timestampsInSnapshots: true};
  firestore.settings(settings);
}

export const auth = firebase.auth()
export const db = firebase.database()
export default firebase
