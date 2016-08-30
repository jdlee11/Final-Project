import React from 'react';
import Header from '../header';
import session from '../../models/session';
import recipeCollection from '../../collections/recipes';
import { hashHistory } from 'react-router';
import settings from '../../settings';
import Dropzone from 'react-dropzone';

let EditRecipePage = React.createClass({
  getInitialState: function(){
    return {
      keywords: [],
      ingredients: [],
      steps: [],
      image: null,
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
  adjustTextBox: function(evt){
    evt.target.style.height = "1px";
    evt.target.style.height = (evt.target.scrollHeight + 20) + "px";
  },
  render: function(){
    let self = this;
    let recipeImage;
    if (this.state.recipe && this.state.recipe.image){
      recipeImage = (
        <div className="new-photo-container">
          <img src={this.state.recipe.image} />
        </div>
      );
    } else {
      recipeImage = (
        <Dropzone className="dropzone" ref="dropzone" onDrop={this.addImageFunction}>
          <img src="assets/noun_585221_cc.png" />
        </Dropzone>
      );
    }
    let keywordList = this.state.keywords.map(function(word, i){
      return (<p className="new-keyword" key={i} onClick={self.removeKeyword}>{word}</p>);
    });
    let ingredientsList = this.state.ingredients.map(function(item, i){
      return (<li className="form-ingredient" key={i} onClick={self.removeIngredient}>{item}</li>);
    });
    let stepsList = this.state.steps.map(function(step, i){
      return (<li className="form-steps" key={i} onClick={self.removeStep}>{step}</li>);
    });
    let saveButton;
    let editRecipeContents;
    if (this.state.recipe){
      if (this.state.recipe.userid === session.get('userId') || this.state.recipe.userid === localStorage.getItem('userId')){
        saveButton = (
          <input type="button" className="change-button" onClick={this.saveFunction} value="Save Changes"/>
        );
      }
      editRecipeContents = (
        <div className="new-recipe-page">
          {recipeImage}
          <div className="new-details">
            <input type="text" placeholder="Recipe Name" ref="title" defaultValue={this.state.recipe.title} required/>

            <form onSubmit={this.addKeywordFunction}>
              <input type="submit" value="+"/>
              <input type="text" placeholder="+ Add Keyword" ref="addKeyword"/>
            </form>
            <div className="form-keywords">
              {keywordList}
            </div>

            <textarea placeholder="Description of your recipe" onKeyUp={this.adjustTextBox} ref="description" defaultValue={this.state.recipe.description}></textarea>
          </div>

          <div className="form-ingredient-list">
            <img className="timer" src="assets/timerIcon.png" />
            <input type="number" placeholder="Prep time" ref="preptime" defaultValue={this.state.recipe.time.replace(' min', '').replace('s', '')} required />
            <h3>Ingredients</h3>
            <form onSubmit={this.addIngredientFunction}>
              <input type="submit" value="+"/>
              <input type="text" placeholder="+ Add Ingredient" ref="addIngredient"/>
            </form>
            <ul>
              {ingredientsList}
            </ul>
          </div>

          <div className="form-step-list">
            <h3>Instructions</h3>
            <form onSubmit={this.addStepFunction}>
              <input type="submit" value="+"/>
              <input type="text" placeholder="+ Add Step" ref="addStep"/>
            </form>
            <ul>
              {stepsList}
            </ul>
          </div>
        </div>
      );
    }
    return (
      <div className="whole-container">
        <Header />
          {editRecipeContents}
          {saveButton}
            <input type="button" className="change-button" onClick={this.cancelFunction} value="Cancel"/>
          {this.props.children}
      </div>
    );
  }
});

export default EditRecipePage;
