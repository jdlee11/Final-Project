import Backbone from 'backbone';
import settings from '../settings';

let Bookmark = Backbone.Model.extend({
  initialize: function(data){
    this.userId = data.userId;
    this.recipeId = data.recipeId;
    this._id = data.recipeId;
  },
  idAttribute: '_id',
  urlRoot: `https://baas.kinvey.com/appdata/${settings.appId}/bookmarks`
});

export default Bookmark;
