import Backbone from 'backbone';
import Made from '../models/made';
import settings from '../settings';

let Mades = Backbone.Collection.extend({
  model: Made,
  url: `https://baas.kinvey.com/appdata/${settings.appId}/mades`
});

const madeCollection = new Mades();

export default madeCollection;
