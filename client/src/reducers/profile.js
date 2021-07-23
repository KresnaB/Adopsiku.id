import { VIEW, FETCH_USERS } from '../constants/actionTypes';

export default (profiles = [], action) => {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload;
    case VIEW:
      return action.payload;
    default:
      return profiles;
  }
};