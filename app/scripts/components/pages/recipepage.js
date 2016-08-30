import React from 'react';
import Header from '../header';
import recipeCollection from '../../collections/recipes';
import { Link, hashHistory } from 'react-router';
import session from '../../models/session';

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
  editFunction: function(){
    hashHistory.push(`edit/${this.props.params.id}`);
  },
  cookFunction: function(){
    hashHistory.push(`recipes/${this.props.params.id}/cookit`);
  },
  render: function(){
    let recipeDetails;
    if (this.state.recipe){
      let keywordList = this.state.recipe.keywords.map(function(word, i){
        return (<p className="recipe-keyword" key={i}>{word}</p>);
      });
      let ingredientsList = this.state.recipe.ingredients.map(function(ingredient, i){
        return (<li key={i}>{ingredient}</li>)
      });
      let stepsList = this.state.recipe.steps.map(function(step, i){
        return (<li key={i}>{step}</li>)
      });
      let editButton;
      if (this.state.recipe.userid === session.get('userId') || localStorage.getItem('userId') === this.state.recipe.userid){
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
          <div className="recipe-page-photo-container">
            <img src={imageSrc} />
          </div>
          <div className="recipe-page-details">
            <h1>{this.state.recipe.title}</h1>
            <p className="author">by <Link to={`profiles/${this.state.recipe.userid}/recipes`}>
              {this.state.recipe.username}</Link>
              {editButton}
            </p>
            <div className="keyword-list">
              {keywordList}
            </div>
            <p className="description-box">
              {this.state.recipe.description}
            </p>
          </div>
          <div className="ingredient-box">
            <img className="timer" src="assets/timerIcon.png" />
            <p>
              {this.state.recipe.time}
            </p>
            <h2>Ingredients</h2>
            <ul className="ingredients">
              {ingredientsList}
            </ul>
          </div>
          <div className="steps-box">
            <h2>Steps</h2>
            <ol className="steps">
              {stepsList}
            </ol>
          </div>
          <input type="button" className="cookit-button" value="Make this recipe" onClick={this.cookFunction}/>
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
