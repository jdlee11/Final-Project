import React from 'react';
import Header from '../header';
import recipeCollection from '../../collections/recipes';
import { Link } from 'react-router';

let RecipePage = React.createClass({
  getInitialState: function(){
    return {
      recipe: null,
      canLike: false,
      canSave: false
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
          <p className="author">by <Link to={`profiles/${this.state.recipe.userid}/recipes`}>{this.state.recipe.username}</Link></p>
          {keywordList}
          <p className="description-box">
            {this.state.recipe.description}
          </p>
          <p>
            <img  className="timer" src="assets/timerIcon.png" />
            {this.state.recipe.time}
          </p>
          <div className="ingredient-box">
            <h2>Ingredients</h2>
            <ul className="ingredients">
              {ingredientsList}
            </ul>
          </div>
          <div className="steps-box">
            <h2>Steps</h2>
            <ul className="steps">
              {stepsList}
            </ul>
          </div>
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
