import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import $ from 'jquery';
import session from './models/session';
import settings from './settings';
import Header from './components/header';
import Signup from './components/signup';
import Login from './components/login';
import RecipePage from './components/pages/recipepage';
import ProfilePage from './components/pages/profilepage';
import AllRecipesPage from './components/pages/allrecipespage';
import NewRecipePage from './components/pages/newrecipepage';
import LogOutPage from './components/pages/logoutpage';
import FavoritesTab from './components/favoritesTab';
import RecipesTab from './components/recipesTab';

$(document).ajaxSend(function(evt, xhrAjax, jqueryAjax) {
  if (session.get('authtoken')) {
    xhrAjax.setRequestHeader('Authorization', 'Kinvey ' + session.get("authtoken"));
  } else {
    xhrAjax.setRequestHeader('Authorization', 'Basic ' + settings.basicAuth);
  }
});


let router = (
  <Router history={hashHistory}>
    <Route path="/" component={Header}>
      <IndexRedirect to="/recipes"/>
    </Route>
    <Route path="signup" component={Signup}/>
    <Route path="login" component={Login}/>
    <Route path="recipes" component={AllRecipesPage}/>
    <Route path="recipes/:id" component={RecipePage}/>
    <Route path="profiles" component={Header}>
      <Route path=":id" component={ProfilePage}>
        <Route path="recipes" component={RecipesTab}/>
        <Route path="bookmarks" component={FavoritesTab}/>
      </Route>
    </Route>
    <Route path="new" component={NewRecipePage}/>
    <Route path="logout" component={LogOutPage}/>
  </Router>
);
// add routes for profile pages and recipe pages
// step by step instructions can be a modal

ReactDOM.render(router, document.getElementById('container'));
