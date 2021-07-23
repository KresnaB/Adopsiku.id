import * as api from '../../api/index';
import {
    ADOPTION_REQUEST_CREATE_REQUEST,
    ADOPTION_REQUEST_CREATE_SUCCESS,
    ADOPTION_REQUEST_CREATE_FAIL,
    ADOPTION_REQUEST_UPDATE_REQUEST,
    ADOPTION_REQUEST_UPDATE_SUCCESS,
    ADOPTION_REQUEST_UPDATE_FAIL,
    ADOPTION_REQUEST_LIST_REQUEST,
    ADOPTION_REQUEST_LIST_SUCCESS,
    ADOPTION_REQUEST_LIST_FAIL,
    ADOPTION_REQUEST_DELETE_REQUEST,
    ADOPTION_REQUEST_DELETE_SUCCESS,
    ADOPTION_REQUEST_DELETE_FAIL,
    ADOPTION_REQUEST_DETAIL_REQUEST,
    ADOPTION_REQUEST_DETAIL_SUCCESS,
    ADOPTION_REQUEST_DETAIL_FAIL,
    PROVIDER_ADOPTION_REQUEST_LIST_REQUEST,
    PROVIDER_ADOPTION_REQUEST_LIST_SUCCESS,
    PROVIDER_ADOPTION_REQUEST_LIST_FAIL,
    ADOPTION_REQUEST_STATUS_REQUEST,
    ADOPTION_REQUEST_STATUS_SUCCESS,
    ADOPTION_REQUEST_STATUS_FAIL,
} from '../../constants/adoptionRequestConstants'

export const applyAdoption = (adoptionData) => async (dispatch) => {
  try {
    dispatch({
      type: ADOPTION_REQUEST_CREATE_REQUEST,
    })

    const data = await api.applyAdoption(adoptionData)

    dispatch({
      type: ADOPTION_REQUEST_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({
      type: ADOPTION_REQUEST_CREATE_FAIL,
      payload: message,
    })
  }
}

export const viewAdoptionsByAdopter = (adopterId) => async (
  dispatch
) => {
  try {
    dispatch({ 
      type: ADOPTION_REQUEST_LIST_REQUEST,
    })

    const { data } = await api.getAdoptionsByAdopter(adopterId);

    dispatch({
      type: ADOPTION_REQUEST_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ADOPTION_REQUEST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const viewAdoptionsByProvider = (providerId) => async (
  dispatch
) => {
  try {
    dispatch({ 
      type: PROVIDER_ADOPTION_REQUEST_LIST_REQUEST,
    })

    const { data } = await api.getAdoptionsByProvider(providerId);

    dispatch({
      type: PROVIDER_ADOPTION_REQUEST_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: PROVIDER_ADOPTION_REQUEST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const cancelAdoption = (adoptionId) => async (dispatch) => {
  try {
    dispatch({
      type: ADOPTION_REQUEST_DELETE_REQUEST,
    })
    await api.cancelAdoption(adoptionId);

    dispatch({ 
      type: ADOPTION_REQUEST_DELETE_SUCCESS, 
      payload: adoptionId
    });
  } catch (error) {
    dispatch({
      type: ADOPTION_REQUEST_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
};

export const viewAdoptionDetail = (adoptionId) => async (dispatch) => {
  try {
    dispatch({ type: ADOPTION_REQUEST_DETAIL_REQUEST })
    const { data } = await api.getAdoptionDetail(adoptionId);

    dispatch({
      type: ADOPTION_REQUEST_DETAIL_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ADOPTION_REQUEST_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateAdoption = (adoptionId, updatedAdoption) => async (dispatch) => {
  try {
    dispatch({
      type: ADOPTION_REQUEST_UPDATE_REQUEST,
    })

    const data = await api.updateAdoption(adoptionId, updatedAdoption)

    dispatch({
      type: ADOPTION_REQUEST_UPDATE_SUCCESS,
      payload: data,
    })
    dispatch({ type: ADOPTION_REQUEST_DETAIL_REQUEST, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch({
      type: ADOPTION_REQUEST_UPDATE_FAIL,
      payload: message,
    })
  }
}


export const updateAdoptionStatus = (adoptionId, status) => async (
  dispatch
) => {
  try {
    dispatch({ 
      type: ADOPTION_REQUEST_STATUS_REQUEST 
    })
    await api.updateAdoptionStatus(adoptionId, status);

    dispatch({
      type: ADOPTION_REQUEST_STATUS_SUCCESS,
      payload: {_id: adoptionId, _status: status},
    })
  } catch (error) {
    dispatch({
      type: ADOPTION_REQUEST_STATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}