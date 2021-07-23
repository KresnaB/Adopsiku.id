import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import petOffers from './petOffers';
import profiles from './profile';
import providerPetOffers from './providerPetOffers';

export const reducers = combineReducers({ posts, auth, petOffers, profiles, providerPetOffers });
