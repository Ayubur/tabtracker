import React from "react";
import { BrowserRouter, Route} from "react-router-dom";
import {Provider} from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from 'redux-thunk';
import reducers from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import throttle from 'lodash.throttle';

import { loadState,saveState} from './localStorage/localStorage';

import Login from "./components/authentication/Login";
import Register from "./components/authentication/Register";
import Logout from "./components/authentication/Logout";
import Songs from "./components/songs/Songs";
import CreateSong from "./components/songs/CreateSong";
import ViewSong from "./components/songs/ViewSong";
import EditSong from "./components/songs/EditSong";

import Navbar from "./components/header/Navbar";


const App = () => { 

  const persistedState = loadState();

  const store = createStore(reducers,persistedState,composeWithDevTools(
    applyMiddleware(reduxThunk)
 ));

 store.subscribe(throttle(() => {
  saveState({
    auth: store.getState().auth
  });
}, 1000));
  
//   const store = createStore(
//     reducers,
//     {},
//     applyMiddleware(reduxThunk)    
// );
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Navbar />
            <Route exact path="/" component={Songs} name="index"/>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/song/create" component={CreateSong} />
            <Route exact path="/songs/:id" component={ViewSong} />
            <Route exact path="/songs/:id/edit" component={EditSong} />
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
