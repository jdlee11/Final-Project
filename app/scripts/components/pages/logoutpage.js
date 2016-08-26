import React from 'react';
import session from '../../models/session';
import { Link, hashHistory } from 'react-router';
import Header from '../header';

let LogOutPage = React.createClass({
  render: function(){
    session.clear();
    session.save({username: 'anonymous', password: 'password'});
    return (
      <div>
        <Header />
        <div className="login-div">
          <h2>Logged out!</h2>
          <Link to="recipes">Return to Home Page</Link>
        </div>
      </div>
    );
  }
});

export default LogOutPage;
