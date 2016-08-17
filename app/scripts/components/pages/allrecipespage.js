import React from 'react';
import Header from '../header';
import recipeCollection from '../../collections/recipes';
import session from '../../models/session';
import RecipeHome from '../recipehome';

let AllRecipesPage = React.createClass({
  getInitialState: function(){
    return {
      loggedIn: (session.get('authtoken')),
      recipes: recipeCollection.toJSON(),
      page: 0,
      maxPage: 0
    };
  },
  componentDidMount: function(){
    if (!session.get('authtoken')){
      session.save({username: 'anonymous', password: 'password'},
      {
        url: session.urlRoot,
        success: () => {
          this.setState({loggedIn: true});
          recipeCollection.fetch({
            url: `${recipeCollection.url}/_count`,
            success: (response, count) => {
              this.setState({maxPage: Math.ceil(count.count/10) - 1});
            }
          })
          this.fetchData();
        }
      });
    } else {
      this.fetchData();
    }
  },
  fetchData: function(){
    recipeCollection.fetch({
      // here is where to add filters
      // for now, only limits to 10 per page
      url: `${recipeCollection.url}?query={}&limit=10&skip=${this.state.page * 10}`,
      success: (response, queryResponse) => {
        this.setState({recipes: queryResponse});
      }
    });
  },
  render: function(){
    let recipeList = this.state.recipes.map(function(item, i){
      return (<RecipeHome recipe={item} key={i} />);
    });
    return (
      <div>
        <Header />
        <div className="all-recipes">
          <p>Look at all these recipes</p>
          {recipeList}
        </div>
      </div>
    );
  }
  // add arrow buttons
  // if this.state.page === 0, left disabled
  // if this.state.page === this.state.maxPage, right disabled
});

export default AllRecipesPage;
