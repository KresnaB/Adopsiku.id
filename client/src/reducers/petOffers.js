import { FETCH_PETOFFERS, CREATE_PETOFFERS, VIEW_PET } from '../constants/actionTypes.js';

export default (petOffers = [], action) => {
    switch (action.type) {
        case FETCH_PETOFFERS:
            return action.payload;
        case CREATE_PETOFFERS:
            return [...petOffers, action.payload];
        case VIEW_PET:
            return action.payload;
        case DELETE_PETOFFER:
            return petOffers.filter((petOffer) => petOffer._id !== action.payload);
        default:
            return petOffers;
    }
};