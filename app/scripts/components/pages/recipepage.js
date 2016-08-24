import React from 'react';
import Header from '../header';
import recipeCollection from '../../collections/recipes';
import { Link, hashHistory } from 'react-router';
import session from '../../models/session';

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
  editFunction: function(){
    hashHistory.push(`edit/${this.props.params.id}`);
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
      let editButton;
      if (this.state.recipe.userid === session.get('userId')){
        editButton = (
          <img className="edit-button" src="assets/noun_141666_cc.png" onClick={this.editFunction}/>
        );
      }
      let imageSrc;
      if (this.state.recipe.image){
        imageSrc = this.state.recipe.image;
      } else {
        imageSrc = "assets/noun_111712_cc.png";
      }
      recipeDetails = (
        <div className="recipe-page">
          <img className="recipe-page-photo" src={imageSrc} />
          <h1>{this.state.recipe.title}</h1>
          <p className="author">by <Link to={`profiles/${this.state.recipe.userid}/recipes`}>
            {this.state.recipe.username}</Link>
            {editButton}
          </p>
          {keywordList}
          <p className="description-box">
            {this.state.recipe.description}
          </p>
          <p>
            <img className="timer" src="assets/timerIcon.png" />
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
      <div className="whole-container">
        <Header />
        {recipeDetails}
        {this.props.children}
      </div>
    );
  }
});

export default RecipePage;
