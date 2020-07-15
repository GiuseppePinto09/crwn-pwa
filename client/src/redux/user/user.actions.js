import UserActionTypes from './user.types';

//GOOGLE SIGN IN
//(2.1) then, this action gets triggered (notice how the "type" is "UserActionTypes.GOOGLE_SIGN_IN_START")
export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START,
  //we dont need a "payload", bc our saga will trigger when this action is fired .. thats y it doesnt need a "payload"
});

//EMAIL SIGN IN
//(3.1) then, this action gets triggered (notice how the "type" is "UserActionTypes.EMAIL_SIGN_IN_START")
export const emailSignInStart = emailAndPassword => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword,
  //(((((IMP)))))
  //(3.1) "emailAndPassword" is an object that gets the "email" & "password" DESTRUCTURED!
});

//(for both the "GOOGLE" & "EMAIL")
export const signInSuccess = user => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = error => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

//(4.2) heres the redux action
//notice how here, theres no "<..>Start" name on this method
//this is because, WE ARE NOT USING "SUCCESS" and "FAILURE" methods ..
export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});

//(5.2) here the actions in order to create the saga ..
export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS, //we dont need a payload, bc we are j triggering a "auth.signOut()" method (and that doesnt need params)
});

export const signOutFailure = error => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

//sign up //(7.3)
export const signUpStart = userCredentials => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userCredentials,
});

export const signUpSuccess = ({ user, additionalData }) => ({
  //HERE!, we destructure it here
  //here you could you pass an OBJECT like: "userObj" (but its better and more understandable if you destructure the thing HERE, so its cleaner what you want to pass! ..)
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { user, additionalData }, //and pass it as an object! with that DESTRUCTURE VALUES!
});

export const signUpFailure = error => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error,
});
