import { all, call, put, takeLatest } from 'redux-saga/effects';

//redux
import UserActionTypes from '../user/user.types';

import { clearCart } from './cart.actions';

//(6.5) this is ofc the method that gets passed to the saga
export function* clearCartOnSignOut() {
  yield put(clearCart()); //that j calls the redux "cart" action that CLEARS OUT THE CART!
}

//(6.4) we create a saga based on the success of the logout ("UserActionTypes.SIGN_OUT_SUCCESS")
//SO LIKE THIS ..
//WE CREATED OUR 1ST
//(((SAGA BASED ON ANOTHER SAGA))) yupiiiiìì!!!11!1
export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}
