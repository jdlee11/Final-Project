import React from 'react';
import RecipeHome from './recipehome';
import recipeCollection from '../collections/recipes';

let RecipesTab = React.createClass({
  getInitialState: function(){
    return {
      recipes: null
    }
  },
  componentDidMount: function(){
    recipeCollection.fetch({
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
    if (this.state.recipes && this.state.recipes.length > 0){
      recipeList = this.state.recipes.map(function(item, i){
        return (<RecipeHome recipe={item} key={i}/>);
      });
    } else if (this.state.recipes){
      recipeList = (<h2>This user has no uploaded recipes</h2>);
    } else {
      recipeList = (<h2>Loading...</h2>);
    }
    return (
      <div className="tab-container">
        {recipeList}
      </div>
    );
  }
});

export default RecipesTab;
