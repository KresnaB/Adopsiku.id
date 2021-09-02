import * as api from "../../api/index";
import {
  PET_OFFER_LIST_REQUEST,
  PET_OFFER_LIST_SUCCESS,
  PET_OFFER_LIST_FAIL,
  SPECIFIC_USER_PET_OFFER_LIST_REQUEST,
  SPECIFIC_USER_PET_OFFER_LIST_SUCCESS,
  SPECIFIC_USER_PET_OFFER_LIST_FAIL,
  PET_OFFER_DETAILS_REQUEST,
  PET_OFFER_DETAILS_SUCCESS,
  PET_OFFER_DETAILS_FAIL,
  PET_OFFER_CREATE_REQUEST,
  PET_OFFER_CREATE_SUCCESS,
  PET_OFFER_CREATE_FAIL,
  PET_OFFER_UPDATE_REQUEST,
  PET_OFFER_UPDATE_SUCCESS,
  PET_OFFER_UPDATE_FAIL,
  PROVIDER_PET_LIST_REQUEST,
  PROVIDER_PET_LIST_SUCCESS,
  PROVIDER_PET_LIST_FAIL,
  PET_OFFER_DELETE_REQUEST,
  PET_OFFER_DELETE_SUCCESS,
  PET_OFFER_DELETE_FAIL,
  PET_OFFER_STATUS_REQUEST,
  PET_OFFER_STATUS_SUCCESS,
  PET_OFFER_STATUS_FAIL,
} from "../../constants/petOfferConstants";

export const listPetOffers = (query, history) => async (dispatch) => {
  try {
    let count = query.split("=")[1];
    if (count.includes("&")) {
      count = parseInt(count.split("&")[0]);
    } else {
      count = parseInt(count);
    }
    dispatch({
      type: PET_OFFER_LIST_REQUEST,
      pageCount: count,
    });

    const { data } = await api.getPetOffers(query);

    dispatch({
      type: PET_OFFER_LIST_SUCCESS,
      payload: data,
      pageCount: count,
    });
    console.log(history);
  } catch (error) {
    let count = query.split("=")[1];
    if (count.includes("&")) {
      count = parseInt(count.split("&")[0]);
    } else {
      count = parseInt(count);
    }
    dispatch({
      type: PET_OFFER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
      pageCount: count,
    });
  }
};

export const getProviderPets = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PROVIDER_PET_LIST_REQUEST,
    });

    const { data } = await api.getProviderPets(id);

    dispatch({
      type: PROVIDER_PET_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROVIDER_PET_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const userPetOffers = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SPECIFIC_USER_PET_OFFER_LIST_REQUEST,
    });

    const { data } = await api.getPetOffersByProviderID(id);

    dispatch({
      type: SPECIFIC_USER_PET_OFFER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SPECIFIC_USER_PET_OFFER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateStatus = (id, status) => async (dispatch) => {
  try {
    dispatch({
      type: PET_OFFER_STATUS_REQUEST,
    });
    await api.updateStatusPetOffer(id, status);

    dispatch({
      type: PET_OFFER_STATUS_SUCCESS,
      payload: { _id: id, _status: status },
    });
  } catch (error) {
    dispatch({
      type: PET_OFFER_STATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const setReportDuration = (id, durationData) => async (dispatch) => {
  try {
    dispatch({
      type: PET_OFFER_UPDATE_REQUEST,
    });
    await api.setReportDuration(id, durationData);

    dispatch({
      type: PET_OFFER_UPDATE_SUCCESS,
      payload: { _id: id, duration: durationData.duration },
    });
  } catch (error) {
    dispatch({
      type: PET_OFFER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listPetOfferDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PET_OFFER_DETAILS_REQUEST });
    const { data } = await api.viewPetDetail(id);

    dispatch({
      type: PET_OFFER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PET_OFFER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createOffer = (petType, petOffer) => async (dispatch) => {
  try {
    dispatch({
      type: PET_OFFER_CREATE_REQUEST,
    });

    let data;

    switch (petType) {
      case "kucing":
        data = await api.createCatOffer(petOffer);
        break;
      case "anjing":
        data = await api.createDogOffer(petOffer);
        break;
      case "kelinci":
        data = await api.createRabbitOffer(petOffer);
        break;
      case "ikan":
        data = await api.createFishOffer(petOffer);
        break;
      case "burung":
        data = await api.createBirdOffer(petOffer);
        break;
      case "fury":
        data = await api.createFuryOffer(petOffer);
        break;
      case "turtle":
        data = await api.createTurtleOffer(petOffer);
        break;
      case "chicken":
        data = await api.createChickenOffer(petOffer);
        break;
      default:
        break;
    }

    dispatch({
      type: PET_OFFER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PET_OFFER_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updatePetOffer = (petId, petType, petData) => async (dispatch) => {
  try {
    dispatch({
      type: PET_OFFER_UPDATE_REQUEST,
    });

    let data;

    switch (petType) {
      case "Cat":
        data = await api.updateCatOffer(petId, petData);
        break;
      case "Dog":
        data = await api.updateDogOffer(petId, petData);
        break;
      case "Rabbit":
        data = await api.updateRabbitOffer(petId, petData);
        break;
      case "Fish":
        data = await api.updateFishOffer(petId, petData);
        break;
      case "Bird":
        data = await api.updateBirdOffer(petId, petData);
        break;
      case "Fury":
        data = await api.updateFuryOffer(petId, petData);
        break;
      case "Turtle":
        data = await api.updateTurtleOffer(petId, petData);
        break;
      case "Chicken":
        data = await api.updateChickenOffer(petId, petData);
        break;
      default:
        break;
    }

    dispatch({
      type: PET_OFFER_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: PET_OFFER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: PET_OFFER_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const deletePetOffer = (provid, id) => async (dispatch) => {
  try {
    dispatch({
      type: PET_OFFER_DELETE_REQUEST,
    });
    await api.deletePetOffer(provid, id);

    dispatch({
      type: PET_OFFER_DELETE_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: PET_OFFER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
