import React from 'react';
import Transition from 'react-addons-css-transition-group';
import recipeCollection from '../collections/recipes';
import likeCollection from '../collections/likes';
import bookmarkCollection from '../collections/bookmarks';
import madeCollection from '../collections/mades';
import { hashHistory } from 'react-router';
import session from '../models/session';

let CookitModal = React.createClass({
  getInitialState: function(){
    return {
      recipe: null,
      totalSteps: 0,
      currentStep: -1,
      stepsCompleted: [], // all false, mark as true when completed. Increase "times made" only if all are true
      haveIngredients: false,
      liked: [],
      bookmarked: []
    };
  },
  componentDidMount: function(){
    let recipe = recipeCollection.get(this.props.params.id).toJSON();
    this.setState({recipe: recipe});
    this.setState({
      totalSteps: recipe.steps.length
    });
    this.setState({
      stepsCompleted: recipe.steps.map(function(){
        return false;
      })
    });

    // check if this recipe is already liked by the user
    likeCollection.fetch({
      data: {
        query: JSON.stringify({
          userId: session.get('userId'),
        })
      }, success: (response, queryResponse) => {
        let self = this;
        if (queryResponse.length > 0){
          this.setState({liked: queryResponse.filter(function(item){
              return item.recipeId === self.state.recipe._id;
            })
          });
        }
      }
    });

    // check if this recipe is bookmarked by the user
    bookmarkCollection.fetch({
      data: {
        query: JSON.stringify({
          userId: session.get('userId'),
        })
      }, success: (response, queryResponse) => {
        let self = this;
        if (queryResponse.length > 0){
          this.setState({bookmarked: queryResponse.filter(function(item){
              return item.recipeId === self.state.recipe._id;
            })
          });
        }
      }
    });
  },

  nextStep: function(){
    this.setState({
      currentStep: this.state.currentStep + 1
    });
  },
  previousStep: function(){
    this.setState({
      currentStep: this.state.currentStep - 1
    });
  },
  markStepComplete: function(){
    let sComplete = this.state.stepsCompleted;
    sComplete[this.state.currentStep] = true;
    this.setState({
      stepsCompleted: sComplete
    });
    setTimeout(() => {
      this.nextStep();
    }, 1300);
  },
  markHaveIngredients: function(){
    this.setState({haveIngredients: true});
    setTimeout(() => {
      this.nextStep();
    }, 1300);
  },
  finishRecipe: function(){
    // check if all steps are completed
    if (!this.state.stepsCompleted.includes(false)){
      madeCollection.create({
        userId: session.get('userId'),
        recipeId: this.state.recipe._id
      }, {
        success: (response) => {
          this.closeModal();
        }
      });
    } else {
      this.closeModal();
    }
  },
  closeModal: function(){
    hashHistory.push(`recipes/${this.props.params.id}`);
  },
  toggleLike: function(){
    if (this.state.liked.length > 0){
      let toRemove = likeCollection.get(this.state.liked[0]);
      toRemove.destroy({
        success: () => {
          this.setState({liked: []});
        }
      });
    } else {
      likeCollection.create({
        userId: session.get('userId'),
        recipeId: this.props.params.id
      }, {
        success: (response) => {
          this.setState({liked: [response]});
        }
      });
    }
  },
  toggleBookmark: function(){
    if (this.state.bookmarked.length > 0){
      let toRemove = bookmarkCollection.get(this.state.bookmarked[0]);
      toRemove.destroy({
        success: () => {
          this.setState({bookmarked: []});
        }
      });
    } else {
      bookmarkCollection.create({
        userId: session.get('userId'),
        recipeId: this.props.params.id
      }, {
        success: (response) => {
          this.setState({bookmarked: [response]});
        }
      });
    }
  },
  render: function(){
    // show different content based on currentStep (-1 is ingredients page,
    // totalSteps +1 could be like/bookmark/check if-complete-page)
    let modalContents;
    if (this.state.recipe){
      let fillLength = (150 / this.state.totalSteps) * this.state.stepsCompleted.filter(function(step){
        return step === true;
      }).length;
      let fill = (<div className="fill" style={{width: fillLength}}></div>);
      let progressBar = (<div className="progress-bar">{fill}</div>);
      if (this.state.currentStep === -1){
        let ingredientsList = this.state.recipe.ingredients.map(function(item, i){
          return (<li key={i}>{item}</li>);
        });
        let rightArrow;
        if (this.state.haveIngredients){
          rightArrow = (<img className="modal-nav-arrow float-right" src="assets/right_arrow.png" onClick={this.nextStep}/>);
        }
        let checkmark;
        if (this.state.haveIngredients){
          checkmark = (<img className="checked-step" src="assets/noun_590807_cc.png"/>);
        } else {
          checkmark = (<img className="unchecked-step" src="assets/noun_10051_cc.png" onClick={this.markHaveIngredients}/>);
        }
        // add right nav arrow to this page, omit left
        modalContents = (
          <div className="modal-contents">
            <div className="step-container">
              <h1>Check your Ingredients</h1>
              <ul className="modal-ingredients">
                {ingredientsList}
              </ul>
            </div>
            {checkmark}
            {progressBar}
            <nav>
              {rightArrow}
            </nav>
          </div>
        );
      } else if (this.state.currentStep === this.state.totalSteps){

        let likeTag;
        let bookmarkTag;
        let likeTagSrc;
        let bookmarkTagSrc;
        if (this.state.liked.length > 0){
          likeTagSrc = "assets/noun_121179_cc.png"
        } else {
          likeTagSrc = "assets/noun_121179_cc_off.png"
        }
        if (this.state.bookmarked.length > 0){
          bookmarkTagSrc = "assets/noun_100771_cc.png";
        } else {
          bookmarkTagSrc = "assets/noun_100771_cc_off.png";
        }
        if (session.get('userId') !== '57ba04bbdd2e952342b96364'){
          likeTag = (<img className="like-tag-modal"
            src={likeTagSrc}
            onClick={this.toggleLike}/>);
          bookmarkTag = (<img className="bookmark-tag-modal"
            src={bookmarkTagSrc}
            onClick={this.toggleBookmark}/>);
        }
        modalContents = (
          <div className="modal-contents">
            <h1>Like and Bookmark this recipe</h1>
            <div className="modal-like-options">
              {likeTag}
              {bookmarkTag}
            </div>
            <input type="button" className="complete-button" value="Finish" onClick={this.finishRecipe}/>
            <nav>
              <img className="modal-nav-arrow float-left" src="assets/left_arrow.png" onClick={this.previousStep}/>
            </nav>
          </div>
        );
      } else {
        let checkmark;
        let rightArrow;
        if (this.state.stepsCompleted[this.state.currentStep] === true){
          checkmark = (<img className="checked-step" src="assets/noun_590807_cc.png"/>);
          rightArrow = (<img className="modal-nav-arrow float-right" src="assets/right_arrow.png" onClick={this.nextStep}/>);
        } else {
          checkmark = (<img className="unchecked-step" src="assets/noun_10051_cc.png" onClick={this.markStepComplete}/>);
        }
        modalContents = (
          <div className="modal-contents">
            <div className="step-container">
              <h1>{`Step ${this.state.currentStep + 1}`}</h1>
              <p>{this.state.recipe.steps[this.state.currentStep]}</p>
            </div>
            {checkmark}
            {progressBar}
            <nav>
              <img className="modal-nav-arrow float-left" src="assets/left_arrow.png" onClick={this.previousStep}/>
              {rightArrow}
            </nav>
          </div>
        );
      }
    }

    return (
      <div className="modal-wrap">
        <div className="cookit-modal-container">
          <img className="close-modal" src="assets/close.png" onClick={this.closeModal}/>
          {modalContents}
        </div>
      </div>
    );
  }
});

export default CookitModal;
