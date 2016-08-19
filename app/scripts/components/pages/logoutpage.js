import React from 'react';
import session from '../../models/session';
import { Link, hashHistory } from 'react-router';

let LogOutPage = React.createClass({
  render: function(){
    session.clear();
    hashHistory.push('recipes');
    return (
      <div className="logout-page">
        <p>Logged out!</p>
        <Link to="recipes">Return to Home Page</Link>
      </div>
    );
  }
});

export default LogOutPage;
