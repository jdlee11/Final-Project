import React from 'react';
// import session from '../models/session';
import settings from '../settings';
import Header from './header';
import session from '../models/session';
import { hashHistory } from 'react-router';

let Signup = React.createClass({
  // use state to show error
  signupFunction: function(evt){
    evt.preventDefault();
    session.clear();
    let username = this.refs.username.value;
    let password = this.refs.password.value;
    let confirm = this.refs.confirm.value;
    if (password === confirm && username !== ""){
      canSignup = session.login(username, password, `https://baas.kinvey.com/user/${settings.appId}/`);
    } else {
      hashHistory.push("signup/error");
    }
  },
  render: function(){
    return (
      <div className="signup-container">
        <Header />
        <div className="signup-div">
          <h2>Sign up</h2>
          <form onSubmit={this.signupFunction}>
            <input type="text" placeholder="username" ref="username"/>
            <input type="password" placeholder="password" ref="password"/>
            <input type="password" placeholder="confirm" ref="confirm"/>
            <input type="submit" value="Submit"/>
          </form>
        </div>
        {this.props.children}
      </div>
    );
  }
});

export default Signup;
