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
import EditRecipePage from './components/pages/editrecipepage';
import CookitModal from './components/cookitModal';
import ConfirmModal from './components/confirmModal';
import Error from './components/error';

$(document).ajaxSend(function(evt, xhrAjax, jqueryAjax) {
  if (jqueryAjax.url === `https://baas.kinvey.com/user/${settings.appId}/`){
    xhrAjax.setRequestHeader('Authorization', 'Basic ' + settings.basicAuth);
  } else if (localStorage.getItem('authtoken')) {
    xhrAjax.setRequestHeader('Authorization', 'Kinvey ' + localStorage.getItem('authtoken'));
  } else if (session.get('authtoken')) {
    xhrAjax.setRequestHeader('Authorization', 'Kinvey ' + session.get('authtoken'));
  } else {
    xhrAjax.setRequestHeader('Authorization', 'Basic ' + settings.basicAuth);
  }
});


let router = (
  <Router history={hashHistory}>
    <Route path="/" component={Header}>
      <IndexRedirect to="/recipes"/>
    </Route>
    <Route path="signup" component={Signup}>
      <Route path="error" component={Error}/>
    </Route>
    <Route path="login" component={Login}>
      <Route path="error" component={Error}/>
    </Route>
    <Route path="recipes" component={AllRecipesPage}/>
    <Route path="recipes/:id" component={RecipePage}>
      <Route path="cookit" component={CookitModal}/>
    </Route>
    <Route path="profiles" component={Header}>
      <Route path=":id" component={ProfilePage}>
        <Route path="recipes" component={RecipesTab}/>
        <Route path="bookmarks" component={FavoritesTab}/>
      </Route>
    </Route>
    <Route path="edit/:id" component={EditRecipePage}>
      <Route path="confirm" component={ConfirmModal}/>
    </Route>
    <Route path="new" component={NewRecipePage}>
      <Route path="confirm" component={ConfirmModal}/>
    </Route>
    <Route path="logout" component={LogOutPage}/>
    <Route path="*" component={Header}>
      <IndexRedirect to="/recipes"/>
    </Route>
  </Router>
);

ReactDOM.render(router, document.getElementById('container'));
