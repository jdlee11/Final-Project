import Backbone from 'backbone';
import Bookmark from '../models/bookmark';
import settings from '../settings';

let BookmarkCollection = Backbone.Collection.extend({
  model: Bookmark,
  url: `https://baas.kinvey.com/appdata/${settings.appId}/bookmarks`
});

let bookmarkCollection = new BookmarkCollection();
export default bookmarkCollection;
