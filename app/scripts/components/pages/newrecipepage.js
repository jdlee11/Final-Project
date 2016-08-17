import React from 'react';
import Header from '../header';
import session from '../../models/session';
import Recipe from '../../models/Recipe';
import recipeCollection from '../../collections/recipes';

let NewRecipePage = React.createClass({
  getInitialState: function(){
    return {
      keywords: [],
      ingredients: [],
      steps: []
    };
  },
  addKeywordFunction: function(evt){
    evt.preventDefault();
    if (this.refs.addKeyword.value !== ''){
      this.setState({keywords: this.state.keywords.concat(this.refs.addKeyword.value)});
      this.refs.addKeyword.value = '';
    }
  },
  addIngredientFunction: function(evt){
    evt.preventDefault();
    if (this.refs.addIngredient.value !== ''){
      this.setState({ingredients: this.state.ingredients.concat(this.refs.addIngredient.value)});
      this.refs.addIngredient.value = '';
    }
  },
  addStepFunction: function(evt){
    evt.preventDefault();
    if (this.refs.addStep.value !== ''){
      this.setState({steps: this.state.steps.concat(this.refs.addStep.value)});
      this.refs.addStep.value = '';
    }
  },
  createFunction: function(evt){
    evt.preventDefault();
    let newRecipe = new Recipe({
      username: session.get('username'),
      userid: session.get('userId'),
      title: this.refs.title.value,
      keywords: this.state.keywords,
      description: this.refs.description.value,
      ingredients: this.state.ingredients,
      steps: this.state.steps
    });
    recipeCollection.create(newRecipe, {
      success: function(response){
        console.log(session.get('userId'));
        // session.get('userId') is the id of the currently logged in user
      }
    });
  },
  render: function(){
    let keywordList = this.state.keywords.map(function(word, i){
      return (<div className="form-keyword" key={i}>{word}</div>);
    });
    let ingredientsList = this.state.ingredients.map(function(item, i){
      return (<div className="form-ingredient" key={i}>{item}</div>);
    });
    let stepsList = this.state.steps.map(function(step, i){
      return (<div className="form-steps" key={i}>{step}</div>);
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
          {ingredientsList}
          <form onSubmit={this.addIngredientFunction}>
            <input type="submit" value="+"/>
            <input type="text" placeholder="+ Add Ingredient" ref="addIngredient"/>
          </form>
          {stepsList}
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
