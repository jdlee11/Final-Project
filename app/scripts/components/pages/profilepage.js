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
    let tabLinkClass;
    let secondTabLinkClass;
    if (this.props.routes[2].path === "recipes"){
      tabLinkClass = "selected-profile-tab";
      secondTabLinkClass = "profile-tab";
    } else {
      tabLinkClass = "profile-tab";
      secondTabLinkClass = "selected-profile-tab";
    }
    let userDetails;
    if (this.state.user){
      userDetails = (
         <div className="profile-page">
          <h1>{this.state.user.username}</h1>
          <div className="profile-tab-list">
            <Link className={tabLinkClass}
              to={`profiles/${this.props.params.id}/recipes`}>Recipes</Link>
            <Link className={secondTabLinkClass}
              to={`profiles/${this.props.params.id}/bookmarks`}>Bookmarks</Link>
          </div>
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
