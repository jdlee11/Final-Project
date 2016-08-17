import React from 'react';
import session from '../../models/session';
import { Link } from 'react-router';

let LogOutPage = React.createClass({
  render: function(){
    session.clear();
    return (
      <div className="logout-page">
        <p>Logged out!</p>
        <Link to="recipes">Return to Home Page</Link>
      </div>
    );
  }
});

export default LogOutPage;
