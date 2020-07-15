import CartActionTypes from './cart.types';
import { addItemToCart, removeItemFromCart } from './cart.utils';

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItems: removeItemFromCart(state.cartItems, action.payload),
      };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          cartItem => cartItem.id !== action.payload.id
        ),
      };
    //((((((((IMP))))))))
    //((((((((IMP))))))))
    //(6.1)
    //immagine we want to CLEAR OUT THE CART when loggin out ..
    //we can just LISTEN for the ACTION TYPE of the signOutStart REDUX ACTION
    //like this ..
    /*
    case UserActionTypes.SIGN_OUT_START: //notice how we are calling "UserActionTypes" (and not "CartActionTypes"),
      return { //and YES, WE CAN DO THAT!
        ...state, //so in that way we get access to the other states ..
        cartItems: [], //so we can for example empty the "cartItems" state (only reachable on that "cart.reducer.js" file!)
      };
    */
    //and that would work ..
    //how?
    //bc ..
    //((((((((WE CAN LISTEN FOR EVERY ACTION INSIDE OTHER REDUCERS!!!))))))))
    //since EVERY ACTION REDUCER returns the state (bc we return the whole state .. ("...state"))

    //but since that feature of clearing out the cart may be used other times (maybe when clicking a button in the cart itself that clears out the cart type of feature)
    //we are going to use another way: putting it in its own action/reducer/saga .. (see the "6.2")
    //(plus its GOOD PRACTICE for us!)
    //so lets do it ..

    //(6.3) we listen for the type and action related to it ..
    case CartActionTypes.CLEAR_CART:
      return {
        ...state,
        cartItems: [], //and ofc, we clear out the cart ..
      };
    default:
      return state;
  }
};

export default cartReducer;
