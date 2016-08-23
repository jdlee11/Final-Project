import React from 'react';
import userCollection from '../../collections/users';
import { Link } from 'react-router';
import store from '../../store';
import session from '../../models/session';

let ProfilePage = React.createClass({
  getInitialState: function(){
    return {
      user: null
    };
  },
  componentDidMount: function(){
    store.users.fetch({
      url: `${store.users.url}/${this.props.params.id}`,
      success: (response, queryResponse) => {
        this.setState({user: queryResponse});
      }
    });
  },
  render: function(){
    let userDetails;
    if (this.state.user){
      userDetails = (
        <div className="profile-page">
          <h1>{this.state.user.username}</h1>
          <Link className="profile-tab"
            to={`profiles/${this.props.params.id}/recipes`}>Recipes</Link>
          <Link className="profile-tab"
            to={`profiles/${this.props.params.id}/bookmarks`}>Bookmarks</Link>
          {this.props.children}
        </div>
      );
    }
    return (
      <div className="profile-container">
        {userDetails}
      </div>
    );
  }
});

export default ProfilePage;
