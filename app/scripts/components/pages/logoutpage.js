import React from 'react';
import session from '../../models/session';
import { Link, hashHistory } from 'react-router';
import Header from '../header';
import settings from '../../settings';

let LogOutPage = React.createClass({
  getInitialState: function(){
    return {
      loggedOut: false
    };
  },
  componentDidMount: function(){
    session.save(null, {
      url: `https://baas.kinvey.com/user/${settings.appId}/_logout`,
      success: () => {
        session.clear();
        localStorage.removeItem('authtoken');
        localStorage.removeItem('userId');
        session.save({username: 'anonymous', password: 'password'});
        this.setState({loggedOut: true});
      }
    });
  },
  render: function(){
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
