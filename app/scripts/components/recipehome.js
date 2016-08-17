import React from 'react';
import { Link } from 'react-router';

let RecipeHome = React.createClass({
  render: function(){
    return (
      <div className="recipe-home">
        <Link to={`recipes/${this.props.recipe._id}`}>{this.props.recipe.title}</Link>
      </div>
    );
  }
});

export default RecipeHome;
