import userCollection from './collections/users';
import session from './models/session';

const store = {
  users: userCollection,
  thisUser: null
};

export default store;
