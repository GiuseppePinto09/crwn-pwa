//(((this file holds all the "SAGA" code related to our "Shop")))

//(1.3) create the ".saga.js" file and start writing the saga code

//saga ("EFFECTS")
import {
  takeLatest,
  call, //it invokes a method (used inside our generator function we pass to "takeEvery")
  put, //"sagas" use its own effect "put" to "dispatch" actions (so they DONT "dispatch" actions with the "dispatch()" method like we did with "THUNK")
  all, //groups all our sagas into one so we only pass one thing on the "root-saga.js" file, and in that way it looks clearner and shit
} from 'redux-saga/effects';

//firebase
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';

//redux
import { ShopActionsTypes } from './shop.types';
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure,
} from './shop.actions';

//(1.4) we know that here we are going to make our API call
export function* fetchCollectionsAsync() {
  //(1.6) and this function, has "yield"s too
  //bc we want to give control to the "SAGA" library
  //(io) in order to stop ((for ex.) if in the middle of a "takeEvery" execution, we make another "takeEvery" call, the 1st call gets stopped (thanks to that "yield"), so the 2nd one can IMMEDIATELY execute (instead of waiting till the 1st one finish ..)) or continue
  // yield console.log('I am being fired AFTER the normal redux action! (thanks to "SAGA")');

  //(1.10)
  const collectionRef = firestore.collection('collections'); //this would be a API call (io)

  //(w "thunk" we used the ".catch()" promise method to CATCH ERRORS)
  //(w "saga" we j use a "try/catch" block!)
  try {
    /* //instead of using the "promise" of ".get()" (that returns a promise ..)
      collectionRef.get().then(
      snapshot => {
    */
    //we use "yield" (which is like a "async/await" type of work)
    const snapshot = yield collectionRef.get();

    /* //then, instead of using
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
     */
    //we use the "call" Saga "effect" that call our function we passed (SO WE USE "yield" ON IT) (even tho, we could w the other aproach too, but idk ..(io))
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap, //1st arg: the FUNCTION itself
      snapshot //2 arg: the FUNCTION'S ARGS
    );

    /* //then, instead of using "dispatch()" to dispatch actions (like we did with "THUNK")
      dispatch(fetchCollectionsSuccess(collectionsMap)); //returning the mapped colllections
      },
    */
    //we use "put", which is the saga effect for creating actions! (diff than "dispatch()" like we used in "THUNK")
    yield put(fetchCollectionsSuccess(collectionsMap)); //(redux action)
  } catch (error) {
    /* //then for catching erros
      error => fetchCollectionsFailure(error.message)
    */
    //we use "put" again! (bc we are dispatching)
    yield put(fetchCollectionsFailure(error.message)); //(redux action)
  }
  //in the "1.11" theres the "thunk" code version of this saga code ..
}

export function* fetchCollectionsStart() {
  //(1.5) but we dont want to STOP our APP execution ..
  //thats why the "takeEvery" method: CREATES A NON BLOCKING CALL in order to NOT stop our application to continue running either other sagas or whatever the user wants to do
  //NW: ("SAGAS" wants to execute them "concurrently", it means the it wans to RUN them all together in a way the DOES NOT block the execution)
  yield takeLatest(
    //using "takeLatest" bc we just want this to resolve one time! (instead of "takeEvery" that might resolve multiple times ..)
    //(((((((IMP)))))))
    //(1.8)
    //smth i realized now ..
    //here, we are not pasying the "name" of the action
    //BUT THE ACTION ITSELF
    //that means that:
    //EVERYTIME this actions (with this name fires .. (this name: "ShopActionsTypes.FETCH_COLLECTIONS_START", the same as below .. duhhh))
    //this SAGA action will fire AFTER!
    //(the "fetchCollectionsAsync" SAGA action!
    ShopActionsTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync //another "generator function"
  );
  //((((so you understand))))
  //the function we pass here (the "fetchCollectionsAsync") ..
  //since we dont want it to stop JS, we dont want to WAIT till the API gets the database data it needs in order to make our App continue executioning ..
  //we use the "takeEvery" method, that does exactly that! (it gives this execution to the browser (io) (as you learned on that JS course .. remember?))
}

//(1.9) SO THATS THE WHOLE POINTS OF "SAGA"S ..
//you get actions (you get them with a certain name ("type"))
//as you put some other actions/functions (or "generator functions" is better)
//thanks to "SAGA"
//so you can perform some other action, once the redux action has finished ..
//(and this saga action is actually a "generator function")
//(bc thats what "SAGA" wants!)
//(like a clg to see if it works, or some other "async code" like it should be! ..)

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
