import React from 'react';
import { Link } from 'react-router';
import likeCollection from '../collections/likes';
import bookmarkCollection from '../collections/bookmarks';
import session from '../models/session';

let RecipeHome = React.createClass({
  getInitialState: function(){
    return {
      liked: [],
      bookmarked: []
    };
  },
  componentDidMount: function(){
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
        recipeId: this.props.recipe._id
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
        recipeId: this.props.recipe._id
      }, {
        success: (response) => {
          this.setState({bookmarked: [response]});
        }
      });
    }
  },
  render: function(){
    // let image;
    // if (this.props.image){
    //
    // }
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
      likeTag = (<img className="like-tag"
        src={likeTagSrc}
        onClick={this.toggleLike}/>);
      bookmarkTag = (<img className="bookmark-tag"
        src={bookmarkTagSrc}
        onClick={this.toggleBookmark}/>);
    }
    return (
      <div className="recipe-home">
        <img className="photo" src="assets/noun_111712_cc.png" />
        <div className="recipe-button-container">
          {likeTag}
          {bookmarkTag}
        </div>
        <p>{`Likes: ${this.props.recipe.liked}`}</p>
        <p>{`Made: ${this.props.recipe.tried}`}</p>
        <Link to={`recipes/${this.props.recipe._id}`}>{this.props.recipe.title}</Link>
        <p className="home-description">{this.props.recipe.description}</p>
      </div>
    );
  }
});

export default RecipeHome;
