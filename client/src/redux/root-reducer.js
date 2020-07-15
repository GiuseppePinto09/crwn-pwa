//redux
import { combineReducers } from 'redux';

import cartReducer from './cart/cart.reducer';
import userReducer from './user/user.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

//localstorage & sessionstorage
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

//localstorage
const persistConfig = {
  //its an obj we have to do it like this (its not ours)
  key: 'root', //first is the key ('root' means that that persist thing has to start from the root)
  storage, //secondly we want to use "localstorage" (we could use sessionStorage here instead ..)
  whilelist: ['cart'], //and finally, "whilelist" is an array that CONTAINS THE REDUCER NAMES (the names that are below) IN A FORM OF A STRING
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
});

export default persistReducer(persistConfig, rootReducer);
