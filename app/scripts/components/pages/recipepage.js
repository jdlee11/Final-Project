import React from 'react';
import Header from '../header';
import recipeCollection from '../../collections/recipes';
import { Link } from 'react-router';

let RecipePage = React.createClass({
  getInitialState: function(){
    return {
      recipe: null
    };
  },
  componentDidMount: function(){
    recipeCollection.fetch({
      url: `${recipeCollection.url}/${this.props.params.id}`,
      success: (response, queryResponse) => {
        this.setState({recipe: queryResponse});
      }
    });
  },
  render: function(){
    let recipeDetails;
    if (this.state.recipe){
      let keywordList = (<p className="recipe-keywords">{this.state.recipe.keywords.join(', ')}</p>);
      let ingredientsList = this.state.recipe.ingredients.map(function(ingredient, i){
        return (<li key={i}>{ingredient}</li>)
      });
      let stepsList = this.state.recipe.steps.map(function(step, i){
        return (<li key={i}>{step}</li>)
      });
      recipeDetails = (
        <div className="recipe-page">
          <h1>{this.state.recipe.title}</h1>
          <p className="author">by <Link to={`profiles/${this.state.recipe.userid}`}>{this.state.recipe.username}</Link></p>
          {keywordList}
          <ul className="ingredients">
            {ingredientsList}
          </ul>
          <ul className="steps">
            {stepsList}
          </ul>
        </div>
      );
    }
    return (
      <div>
        <Header />
        {recipeDetails}
      </div>
    );
  }
});

export default RecipePage;
