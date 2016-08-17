import Backbone from 'backbone';
import settings from '../settings';

let User = Backbone.Model.extend({
  initialize: function(username){
    this.username = username;
  },
  idAttribute: '_id',
  urlRoot: `https://baas.kinvey.com/user/${settings.appId}`,
  defaults: {
    favorites: [],
    recipes: [],
    bio: ''
  }
});

export default User;
