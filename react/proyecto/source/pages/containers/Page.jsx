import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import Home from './Home';
import Post from './Post';
import Profile from './Profile';
import Error404 from './Error404';
import Header from '../../shared/components/Header';

function Pages() {
  return (
    <main role="application">
      {/* <Header /> */}
      <Header />

      <Switch>
        <Route
          path="/"
          exact
          component={Home}
        />
        <Route
          path="/post/:id"
          exact
          component={Post}
        />
        <Route
          path="/user/:id"
          exact
          component={Profile}
        />
        <Route
          component={Error404}
        />
      </Switch>
    </main>
  )
}

export default Pages;
