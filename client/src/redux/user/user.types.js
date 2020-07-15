const UserActionTypes = {
  //sign in
  EMAIL_SIGN_IN_START: 'EMAIL_SIGN_IN_START',
  GOOGLE_SIGN_IN_START: 'GOOGLE_SIGN_IN_START',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS', //made for both the "GOOGLE" and "EMAIL" actions
  SIGN_IN_FAILURE: 'SIGN_IN_FAILURE', //made for both the "GOOGLE" and "EMAIL" actions
  //instead of writing the same code for both the "GOOGLE" and "EMAIL" actions
  // GOOGLE_SIGN_IN_SUCCESS: 'GOOGLE_SIGN_IN_SUCCESS',
  // GOOGLE_SIGN_IN_FAILURE: 'GOOGLE_SIGN_IN_FAILURE',
  // EMAIL_SIGN_IN_SUCCESS: 'EMAIL_SIGN_IN_SUCCESS',
  // EMAIL_SIGN_IN_FAILURE: 'EMAIL_SIGN_IN_FAILURE',
  //user session
  CHECK_USER_SESSION: 'CHECK_USER_SESSION',
  //sign out
  SIGN_OUT_START: 'SIGN_OUT_START',
  SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',
  SIGN_OUT_FAILURE: 'SIGN_OUT_FAILURE',
  //sign up //(7.2)
  SIGN_UP_START: 'SIGN_UP_START',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE: 'SIGN_UP_FAILURE',
};

export default UserActionTypes;
