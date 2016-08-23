import React from 'react';
import RecipeHome from './recipehome';
import recipesCollection from '../collections/recipes';

let RecipesTab = React.createClass({
  getInitialState: function(){
    return {
      recipes: null
    }
  },
  componentDidMount: function(){
    recipesCollection.fetch({
      data: {
        query: JSON.stringify({
          _acl: {
            creator: this.props.params.id
          }
        })
      }, success: (response, queryResponse) => {
        this.setState({recipes: queryResponse});
      }
    });
  },
  render: function(){
    let recipeList;
    if (this.state.recipes){
      recipeList = this.state.recipes.map(function(item, i){
        console.log(item);
        return (<RecipeHome recipe={item} key={i}/>);
      });
    }
    return (
      <div className="tab-container">
        {recipeList}
      </div>
    );
  }
});

export default RecipesTab;
