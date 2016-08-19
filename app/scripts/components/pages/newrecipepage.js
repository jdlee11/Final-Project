import React from 'react';
import Header from '../header';
import session from '../../models/session';
import Recipe from '../../models/Recipe';
import recipeCollection from '../../collections/recipes';
import { hashHistory } from 'react-router';

let NewRecipePage = React.createClass({
  getInitialState: function(){
    return {
      keywords: [],
      ingredients: [],
      steps: []
    };
  },
  removeArrayItem: function(array, item){
    let newArray = array;
    let index = newArray.indexOf(item);
    newArray.splice(index, 1);
    return newArray;
  },
  addKeywordFunction: function(evt){
    evt.preventDefault();
    if (this.refs.addKeyword.value !== ''){
      this.setState({keywords: this.state.keywords.concat(this.refs.addKeyword.value)});
      this.refs.addKeyword.value = '';
    }
  },
  removeKeyword: function(evt){
    let newKeywords = this.removeArrayItem(this.state.keywords, evt.target.innerText);
    this.setState({keywords: newKeywords});
  },
  addIngredientFunction: function(evt){
    evt.preventDefault();
    if (this.refs.addIngredient.value !== ''){
      this.setState({ingredients: this.state.ingredients.concat(this.refs.addIngredient.value)});
      this.refs.addIngredient.value = '';
    }
  },
  removeIngredient: function(evt){
    let newIngredients = this.removeArrayItem(this.state.ingredients, evt.target.innerText);
    this.setState({ingredients: newIngredients});
  },
  addStepFunction: function(evt){
    evt.preventDefault();
    if (this.refs.addStep.value !== ''){
      this.setState({steps: this.state.steps.concat(this.refs.addStep.value)});
      this.refs.addStep.value = '';
    }
  },
  removeStep: function(evt){
    let newSteps = this.removeArrayItem(this.state.steps, evt.target.innerText);
    this.setState({steps: newSteps});
  },
  createFunction: function(evt){
    evt.preventDefault();
    let time = this.refs.preptime.value + " mins";
    if (this.refs.preptime.value === 1){
      time.replace('s', '');
    }
    let newRecipe = new Recipe({
      username: session.get('username'),
      userid: session.get('userId'),
      title: this.refs.title.value,
      keywords: this.state.keywords,
      description: this.refs.description.value,
      time: time,
      ingredients: this.state.ingredients,
      steps: this.state.steps
    });
    recipeCollection.create(newRecipe, {
      success: function(response){
        hashHistory.push('recipes');
      }
    });
  },
  render: function(){
    let self = this;
    let keywordList = this.state.keywords.map(function(word, i){
      return (<div className="form-keyword" key={i} onClick={self.removeKeyword}>{word}</div>);
    });
    let ingredientsList = this.state.ingredients.map(function(item, i){
      return (<div className="form-ingredient" key={i} onClick={self.removeIngredient}>{item}</div>);
    });
    let stepsList = this.state.steps.map(function(step, i){
      return (<div className="form-steps" key={i} onClick={self.removeStep}>{step}</div>);
    });
    return (
      <div>
        <Header />
        <div className="new-recipe-page">
          <input type="text" placeholder="Recipe Name" ref="title" required/>

          {keywordList}
          <form onSubmit={this.addKeywordFunction}>
            <input type="submit" value="+"/>
            <input type="text" placeholder="+ Add Keyword" ref="addKeyword"/>
          </form>

          <textarea placeholder="Description of your recipe" ref="description"></textarea>

          <input type="number" placeholder="Prep time" ref="preptime" required />

          <div className="form-ingredient-list">
            <h3>Ingredients</h3>
            {ingredientsList}
          </div>
          <form onSubmit={this.addIngredientFunction}>
            <input type="submit" value="+"/>
            <input type="text" placeholder="+ Add Ingredient" ref="addIngredient"/>
          </form>

          <div className="form-step-list">
            <h3>Instructions</h3>
            {stepsList}
          </div>
          <form onSubmit={this.addStepFunction}>
            <input type="submit" value="+"/>
            <input type="text" onSubmit={this.addStepFunction} placeholder="+ Add Step" ref="addStep"/>
          </form>

          <input type="button" onClick={this.createFunction} value="Create Recipe!"/>
        </div>
      </div>
    );
  }
});

export default NewRecipePage;
