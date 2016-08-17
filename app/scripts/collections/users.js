import Backbone from 'backbone';
import User from '../models/user';
import settings from '../settings';

let Users = Backbone.Collection.extend({
  model: User,
  url: `https://baas.kinvey.com/user/${settings.appId}`
});

const userCollection = new Users();

export default userCollection;
