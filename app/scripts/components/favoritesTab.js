import React from 'react';
import RecipeHome from './recipehome';
import bookmarkCollection from '../collections/bookmarks';
import recipeCollection from '../collections/recipes';

let FavoritesTab = React.createClass({
  getInitialState: function(){
    return {
      bookmarks: null
    };
  },
  componentDidMount: function(){
    recipeCollection.fetch({
      success: () => {
        bookmarkCollection.fetch({
          data: {
            query: JSON.stringify({
              userId: this.props.params.id
            })
          }, success: (response, queryResponse) => {
            this.setState({bookmarks: queryResponse});
          }
        });
      }
    });
  },
  render: function(){
    let bookmarkList;
    if (this.state.bookmarks){
      console.log(this.state.bookmarks);
      bookmarkList = this.state.bookmarks.map(function(item, i){
        let recipe = recipeCollection.get(item.recipeId);
        console.log(recipe);
        return (<RecipeHome recipe={recipe} key={i}/>);
      });
    }
    return (
      <div className="tab-container">
        {bookmarkList}
      </div>
    );
  }
})

export default FavoritesTab;
