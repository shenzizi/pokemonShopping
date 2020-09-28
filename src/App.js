import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './pages/home/home.component';
import Cart from './pages/cart/cart.component';
import Signin from './pages/signin/signin.component';
import Collection from './pages/collection/collection.component';
import CollectionItem from './pages/collection-item/collection-item.component';
import Topbar from './components/topbar/topbar.component';

import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Topbar />
        <div className="main">
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
            <Route path="/signin">
              <Signin />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>

    </div>
  );
}

export default App;
