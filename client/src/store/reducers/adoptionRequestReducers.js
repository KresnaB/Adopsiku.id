
import {
    ADOPTION_REQUEST_CREATE_REQUEST,
    ADOPTION_REQUEST_CREATE_SUCCESS,
    ADOPTION_REQUEST_CREATE_FAIL,
    ADOPTION_REQUEST_CREATE_RESET,
    ADOPTION_REQUEST_UPDATE_REQUEST,
    ADOPTION_REQUEST_UPDATE_SUCCESS,
    ADOPTION_REQUEST_UPDATE_FAIL,
    ADOPTION_REQUEST_UPDATE_RESET,
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

  export const adoptionReqCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case ADOPTION_REQUEST_CREATE_REQUEST:
        return { loading: true }
      case ADOPTION_REQUEST_CREATE_SUCCESS:
        return { loading: false, success: true, adoptionReq: action.payload }
      case ADOPTION_REQUEST_CREATE_FAIL:
        return { loading: false, error: action.payload }
      case ADOPTION_REQUEST_CREATE_RESET:
        return { }
      default:
        return state
    }
  }

  export const adoptionReqUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case ADOPTION_REQUEST_UPDATE_REQUEST:
        return { loading: true }
      case ADOPTION_REQUEST_UPDATE_SUCCESS:
        return { loading: false, success: true, adoptionReq: action.payload }
      case ADOPTION_REQUEST_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case ADOPTION_REQUEST_UPDATE_RESET:
        return { }
      default:
        return state
    }
  }

  export const adoptionReqListReducer = (state = { adoptionReq: [] }, action) => {
    switch (action.type) {
      case ADOPTION_REQUEST_LIST_REQUEST:
        return { 
          loading: true, 
          adoptionReq: [], 
        }
      case ADOPTION_REQUEST_LIST_SUCCESS:
        return {
          loading: false,
          adoptionReq: action.payload.adoptionRequests,
        }
      case ADOPTION_REQUEST_LIST_FAIL:
        return { loading: false, 
          error: action.payload,
        }
      case ADOPTION_REQUEST_DELETE_REQUEST: 
        return { loading: true, adoptionReq: state.adoptionReq, componentLoading: true}
      case ADOPTION_REQUEST_DELETE_SUCCESS:
          return {
            loading: false,
            adoptionReq: state.adoptionReq.filter((adoption) => adoption._id !== action.payload),
          }
      case ADOPTION_REQUEST_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
}

export const provAdoptionReqListReducer = (state = { adoptionReq: [] }, action) => {
  switch (action.type) {
    case PROVIDER_ADOPTION_REQUEST_LIST_REQUEST:
      return { 
        loading: true, 
        adoptionReq: [], 
      }
    case PROVIDER_ADOPTION_REQUEST_LIST_SUCCESS:
      return {
        loading: false,
        adoptionReq: action.payload.adoptionRequests,
      }
    case PROVIDER_ADOPTION_REQUEST_LIST_FAIL:
      return { loading: false, 
        error: action.payload,
      }
    case ADOPTION_REQUEST_STATUS_REQUEST:
      return { loading: false, adoptionReq: state.adoptionReq, componentLoading: true}
    case ADOPTION_REQUEST_STATUS_SUCCESS:
      const foundIndex = state.adoptionReq.findIndex(x => x._id === action.payload._id);
      state.adoptionReq[foundIndex].status = action.payload._status.status;
      console.log(state.adoptionReq);
      return { loading: false, adoptionReq: state.adoptionReq, componentLoading: false}
    case ADOPTION_REQUEST_STATUS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const adoptionReqDetailReducer = ( state = { adoptionReq: {  } }, action) => {
  switch (action.type) {
    case ADOPTION_REQUEST_DETAIL_REQUEST:
      return { ...state, loading: true }
    case ADOPTION_REQUEST_DETAIL_SUCCESS:
      return { loading: false, adoptionReq: action.payload.adoptionRequest }
    case ADOPTION_REQUEST_DETAIL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}