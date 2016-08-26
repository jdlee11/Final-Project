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
    if (this.state.bookmarks && this.state.bookmarks.length > 0){
      bookmarkList = this.state.bookmarks.map(function(item, i){
        let recipe = recipeCollection.get(item.recipeId);
        return (<RecipeHome recipe={recipe.toJSON()} key={i}/>);
      });
    } else if (this.state.bookmarks){
      bookmarkList = (<h2>This user has no bookmarked recipes</h2>);
    } else {
      bookmarkList = (<h2>Loading...</h2>);
    }
    return (
      <div className="tab-container">
        {bookmarkList}
      </div>
    );
  }
})

export default FavoritesTab;
