import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBI651_JtXuOtFhNw73Phi9K--XW-jVNmU',
  authDomain: 'crwn-db-e7833.firebaseapp.com',
  databaseURL: 'https://crwn-db-e7833.firebaseio.com',
  projectId: 'crwn-db-e7833',
  storageBucket: 'crwn-db-e7833.appspot.com',
  messagingSenderId: '884602608749',
  appId: '1:884602608749:web:6c09b87215c36d324ef364',
  measurementId: 'G-G4969V1ECB',
};
firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collectionsSnapShot => {
  const transformedCollections = collectionsSnapShot.docs.map(docSnapshot => {
    const { title, items } = docSnapshot.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: docSnapshot.id,
      title,
      items,
    };
  });

  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

//the "PROMISE" real-world scenario way of using the "onAuthStateChanged()" "OBSERVABLE" way of firebase
//to check if an user is still logged or not ..
//(so we do this, bc we wont be using firebase on a real-world project)
export const getCurrentUser = () => {
  //thats why we use "Promise" ..
  return new Promise((resolve, reject) => {
    //"onAuthStateChanged" takes 2 methods .. "success" and "error"
    const unsubscribe = auth.onAuthStateChanged(
      //"success"
      userAuth => {
        unsubscribe();
        resolve(userAuth); //(we use the "resolve" Promise param)
      },
      //"error"
      reject //(we use the "reject" Promise param)
    );
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
