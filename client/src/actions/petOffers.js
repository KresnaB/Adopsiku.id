import { FETCH_PETOFFERS, CREATE_PETOFFERS, VIEW_PET, FETCH_PROVIDERPETOFFERS, DELETE_PETOFFER } from '../constants/actionTypes.js';
import * as api from '../api/index.js'; 

//get all pet offers
export const getPetOffers = () => async (dispatch) => {
    try {
        const { data } = await api.getPetOffers();

        dispatch({ type: FETCH_PETOFFERS, payload: data.petOffers});
    } catch (error) {
        console.log(error);
    }
}

//create new pet offer
export const createCatOffer = (petoffer) => async (dispatch) => {
    try {
      const { data } = await api.createCatOffer(petoffer);
  
      dispatch({ type: CREATE_PETOFFERS, payload: data.newCatOffer });
    } catch (error) {
      console.log(error);
    }
};

export const viewPetDetail = (id) => async(dispatch) => {
    try{
        const { data } = await api.viewPetDetail(id);

        dispatch({ type: VIEW_PET, payload: data.petOffer });

    } catch(error){
        console.log(error);
    }
}

export const createDogOffer = (post) => async (dispatch) => {
    try {
       const { data } = await api.createDogOffer(post);
  
       dispatch({ type: CREATE_PETOFFERS, payload: data.newDogOffer });
    } catch (error) {
        console.log(error.message);
    }
};

export const createRabbitOffer = (post) => async (dispatch) => {
    try {
      const { data } = await api.createRabbitOffer(post);
  
      dispatch({ type: CREATE_PETOFFERS, payload: data.newRabbitOffer });
    } catch (error) {
      console.log(error.message);
    }
};

export const createBirdOffer = (post) => async (dispatch) => {
    try {
      const { data } = await api.createBirdOffer(post);
  
      dispatch({ type: CREATE_PETOFFERS, payload: data.newBirdOffer });
    } catch (error) {
      console.log(error.message);
    }
};

export const createFishOffer = (post) => async (dispatch) => {
    try {
      const { data } = await api.createFishOffer(post);
  
      dispatch({ type: CREATE_PETOFFERS, payload: data.newFishOffer });
    } catch (error) {
      console.log(error.message);
    }
};

export const createFuryOffer = (post) => async (dispatch) => {
    try {
      const { data } = await api.createFuryOffer(post);
  
      dispatch({ type: CREATE_PETOFFERS, payload: data.newFuryOffer });
    } catch (error) {
      console.log(error.message);
    }
};

export const createOthersOffer = (post) => async (dispatch) => {
    try {
      const { data } = await api.createOtherOffer(post);
  
      dispatch({ type: CREATE_PETOFFERS, payload: data });
    } catch (error) {
      console.log(error.message);
    }
};

// export const createSnakeOffer = (post) => async (dispatch) => {
//     try {
//       const { data } = await api.createSnakeOffer(post);
  
//       dispatch({ type: CREATE_PETOFFERS, payload: data });
//     } catch (error) {
//       console.log(error.message);
//     }
// };
// export const createOtherOffer = (post) => async (dispatch) => {
//     try {
//       const { data } = await api.createOtherOffer(post);
  
//       dispatch({ type: CREATE_PETOFFERS, payload: data });
//     } catch (error) {
//       console.log(error.message);
//     }
// };

//get all provider pet offers
export const getPetOffersByProviderID = (provID) => async (dispatch) => {
  try {
      const { data } = await api.getPetOffersByProviderID(provID);

      dispatch({ type: FETCH_PROVIDERPETOFFERS, payload: data.petOffers });

  } catch (error) {
      console.log(error);
  }
}

//delete pet offers by id
export const deletePetOffer = (provid, id) => async (dispatch) => {
  try {
    console.log(provid, id);
    await api.deletePetOffer(provid, id);

    dispatch({ type: DELETE_PETOFFER, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};