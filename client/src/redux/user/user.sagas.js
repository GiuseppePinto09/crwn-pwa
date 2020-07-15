import { takeLatest, put, all, call } from 'redux-saga/effects';

//firebase
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser, //our "promise" way of checking the session of a user
} from '../../firebase/firebase.utils';

//redux
import UserActionTypes from './user.types';

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
} from './user.actions';

//made for refactoring, bc this code was being copyied in both "GOOGLE" and "EMAIL" methods ..
//and we can do this refactor, bc the firebase library gives us
//THE SAME RETURN (and code) FOR BOTH "GOOGLE" and "EMAIL" .. (but this wont be the case for real word projects)
export function* getSnapshotFromUserAuth(userAuth, additionalData /*//(7.9)*/) {
  /* //"GOOGLE" before saga
  this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    if (userAuth) {
      const userRef = await createUserProfileDocument(userAuth);
  userRef.onSnapshot(snapShot => {
        setCurrentUser({
          id: snapShot.id,
          ...snapShot.data(),
        });
      });
    }
    setCurrentUser(userAuth);
  });
  */
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData //(7.9) passing "additionalData" to reuse this function! (not useful, bc you are going to use other shit, NOT FIREBASE! ........)
    );
    const userSnapshot = yield userRef.get();
    //(2.4)
    //(3.4)
    //here we call the "signInSuccess(..)" success COMMON method!
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() })); //remember: "put()" "dispatch()"s actions (puts things back to our Redux flow)
  } catch (error) {
    //(2.5)
    //(3.5)
    //and the same, but for our "signInFailure(..)" error COMMON method!
    put(signInFailure(error)); //remember: "put()" "dispatch()"s actions (puts things back to our Redux flow)
  }
  /* //"EMAIL" before saga
  try {
    await auth.signInWithEmailAndPassword(email, password);
    this.setState({ email: '', password: '' });
  } catch (error) {
    console.log(error);
  }
  */
}

//GOOGLE SIGN IN
//(2.3) and here, we do the logic related to our google sign in
export function* signInWithGoogle() {
  //(2.6)
  //we are still use "try/catch" here, bc the "signInWithPopup(..)" firebase method can throws erros too ..
  try {
    // const userRef = yield auth.signInWithPopup(googleProvider); //since what we get back is the user object of firebase (there, theres a "user" obj on that obj)
    const { user } = yield auth.signInWithPopup(googleProvider); //so we can acc "destructure" that "user" obj (that is inside of the user firebase object)
    yield getSnapshotFromUserAuth(user); //since it was the same code for both "GOOGLE" and "EMAIL" we created a new method (for refactoring)
  } catch (error) {
    yield put(signInFailure(error));
  }
}

//EMAIL SIGN IN
//(3.3) and here, we do the logic related to our email sign in
export function* singInWithEmail({ payload: { email, password } }) {
  //(3.1) and here i get the "payload" OBJECT, so i can DESTRUCTURE it, in here (and thats it)
  //(3.6)
  //we are still use "try/catch" here, bc the "signInWithEmailAndPassword(..)" firebase method can throws erros too ..
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password); //the same here ..
    yield getSnapshotFromUserAuth(user); //since it was the same code for both "GOOGLE" and "EMAIL" we created a new method (for refactoring)
  } catch (error) {
    put(signInFailure(error));
  }
}

//USER SESSION
//(3.3) we write our saga and do the whole setup saga that we did in the previous SAGA before .. (so im not going to replicate that here .. fuck u)
export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser(); //"getCurrentUser()" is a utility firebase function that WE write in order to get the current user (xd ..)

    if (!userAuth) return; //if theres no session (the user has never signed in)

    yield getSnapshotFromUserAuth(userAuth); //then we use the same exact method to get the user and shit ..
  } catch (error) {
    yield put(signInFailure(error)); //we can j use the "signInFailure()" action, since this error is an error related to the "sign in" feature
  }
}

//SIGN OUT
//(5.4) here the method when that saga its fired
export function* signOut() {
  try {
    yield auth.signOut(); //acc logic to sign out
    yield put(signOutSuccess()); //on success redux action
  } catch (error) {
    yield put(signOutFailure(error)); //on failure redux action
  }
}

//SIGN UP
//(7.5)
export function* signUp(
  // (userCredentials) //to get the WHOLE "payload" object
  { payload: { displayName, email, password } } //a shortcut to DESTRUCTURE the "payload" directly here!!!!
) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(
      signUpSuccess({
        // user: user //or ..
        user, //a shortcut, since "user" has the same name of the key "user" on the "signUpSuccess" REDUX ACTION!
        additionalData: { displayName },
      })
    );
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

//(7.8)
//so with this func, all we did was
//sign in the user, MANUALLY, so like fullfilling the input sign in fields automatically
//so the user dont have to do it himself!
export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  //
  yield getSnapshotFromUserAuth(user, additionalData); //and this func help us doing that (plus addining some addionalData, etc ..)
  //so thats good! (and with that i FINISH THIS OURS OF SAGA! fuck off m8 ..)
  //an error i did:
  //YOU DONT HAVE TO "put()" that function!
  //since that function is just a UTILITY func inside of this file! ..
  //you only use "put()" when you want to "DISPATCH" ACTIONS! (and thats it!)
}

//(((((IMP)))))
//the name of our "SAGA"s have "on<..>" at the start ..
//(((((because we are listening to a redux action!)))))
//cool huh? xd lol

//google SAGA
//(2.2) and since the type in "takeLatest" is the same ("UserActionTypes.GOOGLE_SIGN_IN_START"),
//then we can call that "signInWithGoogle" method
export function* onGoogleSignInStart() {
  //this method "LISTENS" for the "UserActionTypes.GOOGLE_SIGN_IN_START" redux action!
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

//email SAGA
//(3.2) and since the type in "takeLatest" is the same ("UserActionTypes.EMAIL_SIGN_IN_START"),
//then we can call that "singInWithEmail" method
export function* onEmailSignInStart() {
  //this method "LISTENS" for the "UserActionTypes.GOOGLE_SIGN_IN_START" redux action!
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, singInWithEmail);
}

//user session SAGA
//(5.3) heres the saga method that listens to the "START" redux action ..
export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

//sign out SAGA
export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

//sign up SAGA //(7.4)
//(no reducer state modify, bc we didnt needed to .. its a sign up bruhh)
export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

//(7.7) feature: when user sign in, redirect to the shop (how?, well i think that you can do it by populating the "currentUser" when a user sign up is successful!) (NOW: using the teacher's version modifying mine, idk if it still works, but i didnt remove that comment (the one before this one, in this exact same line), just to keep the logic here, bc it may be useful ONE DAY .. idk .. let me know: what this shit useful: (type here): .. )
export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

//instead of grouping our sagas in the "root-saga"
//WE GROUP ((ALL)) THE "SAGA"S THAT HAS SMTH DO TO WITH THE USER
//((((HERE))))
//and thats it
//(2.7)
//(3.7)
//and that would be it
//but ofc you gotta make it work, so thats why you gotta put that SAGA on the "root-saga" file
//but first, it GOOD PRACTICE to create a saga that takes all the SAGAs related to a specific type (in this case "user")
export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart), //(7.6) remember to "call()" it HERE!!!!!! (I forgot abt it, and lost a bit of time xd (couldnt understand what was happening .. and this problem ended up it xd))
    call(onSignUpSuccess), //(7.10)
  ]);
}
