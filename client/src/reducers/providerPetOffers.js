import { FETCH_PROVIDERPETOFFERS } from '../constants/actionTypes.js';

export default (providerPetOffers = [], action) => {
    switch (action.type) {
        case FETCH_PROVIDERPETOFFERS:
            return action.payload;
        case DELETE_PETOFFER:
            return providerPetOffers.filter((providerPetOffer) => providerPetOffer._id !== action.payload);
        default:
            return providerPetOffers;
    }
};