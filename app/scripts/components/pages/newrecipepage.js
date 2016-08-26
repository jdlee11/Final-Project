import React from 'react';
import Header from '../header';
import session from '../../models/session';
import Recipe from '../../models/Recipe';
import recipeCollection from '../../collections/recipes';
import { hashHistory } from 'react-router';
import Dropzone from 'react-dropzone';
import $ from 'jquery';
import settings from '../../settings';

let NewRecipePage = React.createClass({
  getInitialState: function(){
    return {
      keywords: [],
      ingredients: [],
      steps: [],
      image: ""
    };
  },
  removeArrayItem: function(array, item){
    let newArray = array;
    let index = newArray.indexOf(item);
    newArray.splice(index, 1);
    return newArray;
  },
  addImageFunction: function(files){
    if (files[0].type.substr(0, 5) === "image"){
      console.log(files[0]);
      let file = files[0];
      let fileReader = new FileReader();
      let fileUrl = fileReader.readAsDataURL(file);
      fileReader.onloadend = function(evt){
        this.setState({
          image: [fileReader.result]
        })
      }.bind(this);
    }
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
    let newImageSrc = "assets/noun_111712_cc.png";
    if (this.state.image[0]){
      newImageSrc = this.state.image[0];
    }
    let newRecipe = new Recipe({
      username: session.get('username'),
      userid: session.get('userId'),
      title: this.refs.title.value,
      keywords: this.state.keywords,
      description: this.refs.description.value,
      time: time,
      ingredients: this.state.ingredients,
      steps: this.state.steps,
      liked: 0,
      tried: 0,
      image: newImageSrc
    });
    recipeCollection.create(newRecipe, {
      success: function(response){
        console.log(response);
        hashHistory.push(`new/confirm`);
      }
    });
  },
  render: function(){
    let recipeImage;
    if (this.state.image[0]){
      recipeImage = (<img className="dropzone" src={this.state.image[0]} />);
    } else {
      recipeImage = (
        <Dropzone className="dropzone" ref="dropzone" onDrop={this.addImageFunction}>
          <img src="assets/noun_585221_cc.png" />
        </Dropzone>
      );
    }
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
      <div className="whole-container">
        <Header />
        <div className="new-recipe-page">
          {recipeImage}

          <div className="new-details">
            <input type="text" placeholder="Recipe Name" ref="title" required/>

            {keywordList}
            <form onSubmit={this.addKeywordFunction}>
              <input type="submit" value="+"/>
              <input type="text" placeholder="+ Add Keyword" ref="addKeyword"/>
            </form>

            <textarea placeholder="Description of your recipe" ref="description"></textarea>

            <img className="timer" src="assets/timerIcon.png" />
            <input type="number" placeholder="Prep time" ref="preptime" required />
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

          <input type="button" onClick={this.createFunction} value="Create Recipe!"/>
        </div>
      </div>
    );
  }
});

export default NewRecipePage;
