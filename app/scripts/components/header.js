import React from 'react';
import { Link } from 'react-router';
import recipeCollection from '../collections/recipes';
import session from '../models/session';

let Header = React.createClass({
  render: function(){
    let headerContents;
    if (session.get('authtoken') && session.get('userId') !== '57b38016bcd8c7723b8f72c7'){
      headerContents = (
        <div className="header">
          <Link to="new">Add Recipe</Link>
          <Link to={`profiles/${session.get('userId')}`}>My Profile</Link>
          <Link to="logout">Log Out</Link>
        </div>
      );
    } else {
      headerContents = (
        <div className="header">
          <Link to="signup">Sign up</Link>
          <Link to="login">Log in</Link>
        </div>
      );
    }
    return (
      <div>
        {headerContents}
        <Link to="recipes">Home</Link>
        {this.props.children}
      </div>
    );
  }
});

export default Header;
