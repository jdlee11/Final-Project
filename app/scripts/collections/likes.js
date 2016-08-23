import Backbone from 'backbone';
import Like from '../models/like';
import settings from '../settings';

let LikeCollection = Backbone.Collection.extend({
  model: Like,
  url: `https://baas.kinvey.com/appdata/${settings.appId}/likes`
});

let likeCollection = new LikeCollection();
export default likeCollection;
