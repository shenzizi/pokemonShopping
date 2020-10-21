import React, {
  useReducer,
  useCallback
} from 'react';
import {
  Switch,
  Route,
} from "react-router-dom";

import Home from './pages/home/home.component';
import Cart from './pages/cart/cart.component';
import Signin from './pages/signin/signin.component';
import Collection from './pages/collection/collection.component';
import CollectionItem from './pages/collection-item/collection-item.component';
import Page404 from './pages/404/404.component';
import Async from './pages/async/async.component';

import Topbar from './components/topbar/topbar.component';
import ErrorHandler from './pages/error-handler/error-handler.component';
import Notification from './components/notification/notification.component';

import './App.css';

export const NotifyContext = React.createContext({});

function App() {
  console.log('render App');
  const notifyReducer = (state, action) => {
    switch (action.type) {
      case "ADD_NOTIFICATION":
        return { ...state, ...action.payload };
      case "REMOVE_NOTIFICATION":
        const update = { ...state };
        delete update[action.id];
        return update;
      default:
        return state
    }
  }

  const [notification, notifyDispatch] = useReducer(notifyReducer, {});

  return (

    <div className="App">
      <Topbar />
      <NotifyContext.Provider value={{ notification, notifyDispatch }}>
        <Notification />
        <div className="main">
          <ErrorHandler>
            <Switch>
              <Route path="/shop/:category/:id">
                <CollectionItem />
              </Route>
              <Route path="/shop/:category">
                <Collection />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              <Route path="/async">
                <Async />
              </Route>
              <Route path="/signin">
                <Signin />
              </Route>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/404">
                <Page404 />
              </Route>
            </Switch>
          </ErrorHandler>
        </div>
      </NotifyContext.Provider>
    </div>
  );
}

export default App;
