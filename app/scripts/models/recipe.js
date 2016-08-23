import Backbone from 'backbone';
import settings from '../settings';

let Recipe = Backbone.Model.extend({
  initialize: function(data){
    this.username = data.username;
    this.userId = data.userId;
    this.title = data.title;
    this.keywords = data.keywords || [];
    this.description = data.description || '';
    this.time = data.time;
    this.ingredients = data.ingredients;
    this.steps = data.steps;
    this.liked = data.liked;
    this.tried = data.tried;
  },
  idAttribute: '_id',
  urlRoot: `https://baas.kinvey.com/appdata/${settings.appId}/recipes`
});

export default Recipe;
