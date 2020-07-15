import { all, call } from 'redux-saga/effects';

import { userSagas } from './user/user.sagas';
import { cartSagas } from './cart/cart.sagas';
import { shopSagas } from './shop/shop.sagas';

export default function* rootSaga() {
  //by using diff "yield"s
  //yield fetchCollectionsStart();
  //yield fetchCollectionsStart1();
  //yield fetchCollectionsStart2();
  //we are acc waiting the 1st one "yield" to finish to go to the 2nd one ..

  //instead with "all()" we are (((EXECUTING THEM ALL TOGETHER!))) ("concurrently!")
  yield all([
    //you could just call it manually, like this
    // userSagas(),
    //but most people like to use the "call(<func>)" method for GOOD PRACTICE!
    call(userSagas),
    //(2.8) in case you are stupid, here is where you put it
    //(3.8) in case you are stupid, here is where you put it
    call(cartSagas),
    call(shopSagas),
  ]);
}
