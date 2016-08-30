import React from 'react';
import { Link } from 'react-router';
import likeCollection from '../collections/likes';
import bookmarkCollection from '../collections/bookmarks';
import session from '../models/session';
import recipeCollection from '../collections/recipes';
import madeCollection from '../collections/mades';

let RecipeHome = React.createClass({
  getInitialState: function(){
    return {
      liked: [],
      bookmarked: [],
      recipe: null,
      numLikes: 0,
      numMade: 0
    };
  },
  componentDidMount: function(){

    this.setState({recipe: recipeCollection.get(this.props.recipe._id).toJSON()});

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
              return item.recipeId === self.props.recipe._id;
            })
          });
        }
      }
    });

    // get number of likes
    this.updateLikes();

    // get the number of times this recipe has been made
    madeCollection.fetch({
      data: {
        query: JSON.stringify({
          recipeId: this.props.recipe._id
        })
      }, success: (response, queryResponse) => {
        this.setState({numMade: queryResponse.length});
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
              return item.recipeId === self.props.recipe._id;
            })
          });
        }
      }
    });
  },
  updateLikes: function(){
    // get the number of times this recipe has been liked
    likeCollection.fetch({
      data: {
        query: JSON.stringify({
          recipeId: this.props.recipe._id
        })
      }, success: (response, queryResponse) => {
        this.setState({numLikes: queryResponse.length});
      }
    });
  },
  toggleLike: function(){
    if (this.state.liked.length > 0){
      let toRemove = likeCollection.get(this.state.liked[0]);
      toRemove.destroy({
        success: () => {
          this.setState({liked: []});
          this.updateLikes();
        }
      });
    } else {
      likeCollection.create({
        userId: session.get('userId'),
        recipeId: this.props.recipe._id
      }, {
        success: (response) => {
          this.setState({liked: [response]});
          this.updateLikes();
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
        recipeId: this.props.recipe._id
      }, {
        success: (response) => {
          this.setState({bookmarked: [response]});
        }
      });
    }
  },
  render: function(){
    let imageSrc;
    if (this.props.recipe.image){
      imageSrc = this.props.recipe.image;
    } else {
      imageSrc = "assets/noun_111712_cc.png";
    }
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
    if (session.get('userId') !== '57ba04bbdd2e952342b96364'
      && localStorage.getItem('userId') !== 'undefined'){
      likeTag = (<img className="like-tag"
        src={likeTagSrc}
        onClick={this.toggleLike}/>);
      bookmarkTag = (<img className="bookmark-tag"
        src={bookmarkTagSrc}
        onClick={this.toggleBookmark}/>);
    }
    return (
      <div className="recipe-home">
        <div className="photo-container">
          <img className="photo" src={imageSrc} />
        </div>
        <div className="recipe-button-container">
          {likeTag}
          {bookmarkTag}
        </div>
        <p>
          <img className="like-icon" src="assets/likes_icon.png"/>
          {this.state.numLikes}
        </p>
        <p>
          <img className="tried-icon" src="assets/noun_7565_cc.png"/>
          {this.state.numMade}
        </p>
        <Link to={`recipes/${this.props.recipe._id}`}>{this.props.recipe.title}</Link>
      </div>
    );
  }
});

export default RecipeHome;
