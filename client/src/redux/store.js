//redux
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';

//localstorage and sessionstorage
import { persistStore } from 'redux-persist';

//(1.1)
//saga
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';

//(1.2)
const sagaMiddleware = createSagaMiddleware(); //create a const

const middlewares = [sagaMiddleware]; //and put it in the "middleware" (at the place of the "thunk" (as we had before))

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

//(1.7)
//we pass every single "saga" that we want to execute HERE!
// sagaMiddleware.run(fetchCollectionsStart);
// sagaMiddleware.run(OTHERONE ..);
// sagaMiddleware.run(OTHERONE2 ..);
//and so on ..
//with the "root-saga" we dont have to use "run()" every time we want to call a SAGA
//(bc we would have had to copy the line of code EVERY TIME we wanted to call a saga .. and thats BAD PRACTICE!)

//(1.11)
sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default { store, persistor };
