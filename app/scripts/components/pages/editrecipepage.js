import React from 'react';
import Header from '../header';
import session from '../../models/session';
import recipeCollection from '../../collections/recipes';
import { hashHistory } from 'react-router';
import settings from '../../settings';

let EditRecipePage = React.createClass({
  getInitialState: function(){
    return {
      keywords: [],
      ingredients: [],
      steps: [],
      imageId: "",
      recipe: null
    };
  },
  componentDidMount: function(){
    let recipe = recipeCollection.get(this.props.params.id);
    this.setState({recipe: recipe.toJSON()});
    this.setState({keywords: recipe.keywords});
    this.setState({ingredients: recipe.ingredients});
    this.setState({steps: recipe.steps});
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
  saveFunction: function(evt){
    evt.preventDefault();
    let time = this.refs.preptime.value + " mins";
    if (this.refs.preptime.value === 1){
      time.replace('s', '');
    }
    // save model's new values
    recipeCollection.get(this.state.recipe).save({
      title: this.refs.title.value,
      keywords: this.state.keywords,
      description: this.refs.description.value,
      time: time,
      ingredients: this.state.ingredients,
      steps: this.state.steps,
    });
    hashHistory.push(`edit/${this.props.params.id}/confirm`);
  },
  cancelFunction: function(evt){
    evt.preventDefault();
    hashHistory.push(`recipes/${this.props.params.id}`);
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
    let saveButton;
    console.log(this.state.recipe);
    console.log(session.get('userId'));
    let editRecipeContents;
    if (this.state.recipe){
      if (this.state.recipe.userid === session.get('userId')){
        saveButton = (
          <input type="button" className="save-button" onClick={this.saveFunction} value="Save Changes"/>
        );
      }
      editRecipeContents = (
        <div className="new-recipe-page">
          // image
          <div className="edit-details">
            <input type="text" placeholder="Recipe Name" ref="title" defaultValue={this.state.recipe.title} required/>
            {keywordList}
            <form onSubmit={this.addKeywordFunction}>
              <input type="submit" value="+"/>
              <input type="text" placeholder="+ Add Keyword" ref="addKeyword"/>
            </form>

            <textarea placeholder="Description of your recipe" ref="description" defaultValue={this.state.recipe.description}></textarea>

            <img className="timer" src="assets/timerIcon.png" />
            <input type="number" placeholder="Prep time" ref="preptime" defaultValue={this.state.recipe.time.replace(' min', '').replace('s', '')} required />
          </div>
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
        </div>
      );
    }
    return (
      <div className="whole-container">
        <Header />
          {editRecipeContents}
          {saveButton}
          <input type="button" className="cancel-button" onClick={this.cancelFunction} value="Cancel"/>
          {this.props.children}
      </div>
    );
  }
});

export default EditRecipePage;
