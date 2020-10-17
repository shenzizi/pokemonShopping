import React from 'react';
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

import './App.css';

function App() {
  return (
    <div className="App">
      <Topbar />
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
    </div>
  );
}

export default App;
