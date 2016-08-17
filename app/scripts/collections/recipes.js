import Backbone from 'backbone';
import Recipe from '../models/recipe';
import settings from '../settings';

let Recipes = Backbone.Collection.extend({
  model: Recipe,
  url: `https://baas.kinvey.com/appdata/${settings.appId}/recipes`
});

const recipeCollection = new Recipes();

export default recipeCollection;
