import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//localstorage
import { PersistGate } from 'redux-persist/integration/react';

//router
import { BrowserRouter } from 'react-router-dom';

//(14.) PWA (Progressive Web Apps)
//import that "serviceWorker" from the FILE that WE HAVE HERE! (and that CRA provided for us)
//serviceWorkers
import * as serviceWorker from './serviceWorker';

//redux
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';

//components
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

//(14.1)
//".register()" makes it WORK!
//".unregister()" makes it DONT WORK!
serviceWorker.register(); //so we j call it

//(14.3) modifying the "manifest.json" (in the "public folder"), and adding images for the "SPLASH SCREEN" of our PWA
//(putting the point in here, since we cannot comment on ".json" files ..)
//you could change the background color too! ..
