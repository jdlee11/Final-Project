import React from 'react';
import userCollection from '../../collections/users';
import { Link } from 'react-router';
import store from '../../store';
import recipesCollection from '../../collections/recipes';
import session from '../../models/session';

let ProfilePage = React.createClass({
  getInitialState: function(){
    return {
      user: null,
      recipes: null,
      favorites: null
    };
  },
  componentDidMount: function(){
    store.users.fetch({
      url: `${store.users.url}/${this.props.params.id}`,
      success: (response, queryResponse) => {
        this.setState({user: queryResponse});
      }
    });
    recipesCollection.fetch({
      data: {
        query: JSON.stringify({
          _acl: {
            creator: session.get('userId')
          }
        })
      }, success: (response, queryResponse) => {
        this.setState({recipes: queryResponse});
      }
    });
  },
  render: function(){
    let userDetails;
    if (this.state.user){
      let recipeList;
      if (this.state.recipes){
        recipeList = this.state.recipes.map(function(item, i){
          return (<div className="profile-recipe" key={i}>
            <Link to={`recipes/${item._id}`}>{item.title}</Link>
          </div>);
        });
      }
      userDetails = (
        <div className="profile-page">
          <p>{this.state.user.username}</p>
          <h3>Recipes</h3>
          {recipeList}
        </div>
      );
    }
    return (
      <div>
        {userDetails}
      </div>
    );
  }
});

export default ProfilePage;
