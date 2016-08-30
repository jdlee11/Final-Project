import React from 'react';
import { Link } from 'react-router';
import recipeCollection from '../collections/recipes';
import session from '../models/session';

let Header = React.createClass({
  render: function(){
    let headerContents;
    if (localStorage.getItem('authtoken')
      && session.get('userId') !== '57ba04bbdd2e952342b96364'
      && localStorage.getItem('userId') !== 'undefined'){
      headerContents = (
        <div className="header">
          <Link to="recipes">
            <img className="logo" src="assets/noun_118404_cc.png" />
            <h1>Cookit</h1>
          </Link>

          <Link to="logout">
            <img className="header-icon" src="assets/noun_344460_cc.png" />
            <p>Log Out</p>
          </Link>
          <Link to={`profiles/${localStorage.getItem('userId')}/recipes`}>
            <img className="header-icon" src="assets/noun_305942_cc.png" />
            <p>Profile</p>
          </Link>
          <Link to="new">
            <img className="header-icon" src="assets/noun_145052_cc.png" />
            <p>Add Recipe</p>
          </Link>
          <Link to="recipes">
            <img className="header-icon" src="assets/noun_441259_cc.png" />
            <p>Home</p>
          </Link>
        </div>
      );
    } else {
      headerContents = (
        <div className="header">
          <Link to="recipes">
            <img className="logo" src="assets/noun_118404_cc.png" />
            <h1>Cookit</h1>
          </Link>
          <Link to="signup">
            <img className="header-icon" src="assets/noun_6478_cc.png" />
            <p>Sign Up</p>
          </Link>
          <Link to="login">
            <img className="header-icon" src="assets/noun_344461_cc.png" />
            <p>Log In</p>
          </Link>
          <Link to="recipes">
            <img className="header-icon" src="assets/noun_441259_cc.png" />
            <p>Home</p>
          </Link>
        </div>
      );
    }
    return (
      <div>
        {headerContents}
        {this.props.children}
      </div>
    );
  }
});

export default Header;
