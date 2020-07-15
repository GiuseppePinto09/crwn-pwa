import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  error: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //this is a shortcut, so we dont have to write the same "return {..}" thing again for the "GOOGLE" and the "EMAIL" ..
    // case UserActionTypes.EMAIL_SIGN_IN_SUCCESS:
    // case UserActionTypes.GOOGLE_SIGN_IN_SUCCESS:
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null, //once it successed, WE WANT TO CLEAR ANY ERRORS (reset the error to "null")
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null, //(5.5) here we reset the values when LOGGING OUT (the "currentUser", the "error" (maybe the "token", "cookies", "localStorage", "ecc .."))
        error: null, //once it successed, WE WANT TO CLEAR ANY ERRORS (reset the error to "null")
      };
    //this is a shortcut, so we dont have to write the same "return {..}" thing again for the "GOOGLE" and the "EMAIL" ..
    // case UserActionTypes.EMAIL_SIGN_IN_FAILURE:
    // case UserActionTypes.GOOGLE_SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
