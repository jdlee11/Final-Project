import React from 'react';
import { Link } from 'react-router';

let RecipeHome = React.createClass({
  render: function(){
    // let image;
    // if (this.props.image){
    //
    // }

    // use heart icon for likes
    return (
      <div className="recipe-home">
        <Link to={`recipes/${this.props.recipe._id}`}>{this.props.recipe.title}</Link>
        <p className="home-description">{this.props.recipe.description}</p>
        <p>{`Likes: ${this.props.recipe.liked}`}</p>
        <p>{`Tried: ${this.props.recipe.tried}`}</p>
      </div>
    );
  }
});

export default RecipeHome;
