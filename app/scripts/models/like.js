import Backbone from 'backbone';
import settings from '../settings';

let Like = Backbone.Model.extend({
  initialize: function(data){
    this.userId = data.userId;
    this.recipeId = data.recipeId;
  },
  idAttribute: '_id',
  urlRoot: `https://baas.kinvey.com/appdata/${settings.appId}/likes`
});

export default Like;
