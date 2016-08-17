import Backbone from 'backbone';
import settings from '../settings';

let Recipe = Backbone.Model.extend({
  initialize: function(data){
    this.username = data.username;
    this.userid = data.userid;
    this.title = data.title;
    this.keywords = data.keywords || [];
    this.description = data.description || '';
    this.ingredients = data.ingredients;
    this.steps = data.steps;
  },
  idAttribute: '_id',
  urlRoot: `https://baas.kinvey.com/appdata/${settings.appId}/recipes`,
  defaults: {
    favorited: 0
  }
});

export default Recipe;
