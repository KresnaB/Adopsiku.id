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
    PET_OFFER_CREATE_RESET,
    PET_OFFER_UPDATE_REQUEST,
    PET_OFFER_UPDATE_SUCCESS,
    PET_OFFER_UPDATE_FAIL,
    PET_OFFER_UPDATE_RESET,
    PET_OFFER_DELETE_REQUEST,
    PET_OFFER_DELETE_SUCCESS,
    PET_OFFER_DELETE_FAIL,
    PET_OFFER_STATUS_REQUEST,
    PET_OFFER_STATUS_SUCCESS,
    PET_OFFER_STATUS_FAIL,
    PROVIDER_PET_LIST_REQUEST,
    PROVIDER_PET_LIST_SUCCESS,
    PROVIDER_PET_LIST_FAIL,

} from '../../constants/petOfferConstants'

export const petOfferListReducer = (state = { petOffers: [] }, action) => {
    switch (action.type) {
      case PET_OFFER_LIST_REQUEST:
        return { 
          loading: true, 
          petOffers: [], 
          pageCount: action.pageCount
        }
      case PET_OFFER_LIST_SUCCESS:
        return {
          loading: false,
          petOffers: action.payload.petOffers,
          pageCount: action.pageCount,
          totalPage: action.payload.totalPage,
          totalOffer: action.payload.totalOffer,
        }
      case PET_OFFER_LIST_FAIL:
        return { loading: false, 
          error: action.payload,
          pageCount: action.pageCount
        }
      default:
        return state
    }
}

export const providerPetsReducer = (state = { petOffers: [] }, action) => {
  switch (action.type) {
    case PROVIDER_PET_LIST_REQUEST:
      return { 
        loading: true, 
        petOffers: [], 
        provider: {},
        pageCount: action.pageCount
      }
    case PROVIDER_PET_LIST_SUCCESS:
      return {
        loading: false,
        petOffers: action.payload.petOffers,
        provider: action.payload.provider,
        pageCount: action.pageCount,
        totalPage: action.payload.totalPage,
        totalOffer: action.payload.totalOffer,
      }
    case PROVIDER_PET_LIST_FAIL:
      return { loading: false, 
        error: action.payload,
        pageCount: action.pageCount
      }
    default:
      return state
  }
}

export const userPetOfferListReducer = (state = { petOffers: [] }, action) => {
  switch (action.type) {
    case SPECIFIC_USER_PET_OFFER_LIST_REQUEST:
      return { loading: true, petOffers: [] }
    case SPECIFIC_USER_PET_OFFER_LIST_SUCCESS:
      return {
        loading: false,
        petOffers: action.payload.petOffers,
      }
    case SPECIFIC_USER_PET_OFFER_LIST_FAIL:
      return { loading: false, error: action.payload }
    case PET_OFFER_STATUS_REQUEST:
      return { loading: false, petOffers: state.petOffers, componentLoading: true}
    case PET_OFFER_STATUS_SUCCESS:
      const foundIndex = state.petOffers.findIndex(x => x._id === action.payload._id);
      state.petOffers[foundIndex].status = action.payload._status.status;
      console.log(state.petOffers);
      return { loading: false, petOffers: state.petOffers, componentLoading: false}
    case PET_OFFER_STATUS_FAIL:
      return { loading: false, error: action.payload }
    case PET_OFFER_DELETE_REQUEST: 
      return { loading: true, petOffers: state.petOffers, componentLoading: true}
    case PET_OFFER_DELETE_SUCCESS:
        return {
          loading: false,
          petOffers: state.petOffers.filter((petOffer) => petOffer._id !== action.payload),
        }
    case PET_OFFER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const petOfferDetailsReducer = ( state = { petOffer: {}, adopter: {} }, action) => {
  switch (action.type) {
    case PET_OFFER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case PET_OFFER_DETAILS_SUCCESS:
      return { loading: false, petOffer: action.payload.petOffer, adopter: action.payload.adopter }
    case PET_OFFER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const petOfferCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PET_OFFER_CREATE_REQUEST:
      return { loading: true }
    case PET_OFFER_CREATE_SUCCESS:
      return { loading: false, success: true, petOffer: action.payload }
    case PET_OFFER_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case PET_OFFER_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const petOfferUpdateReducer = (state = { petOffer: {} }, action) => {
  switch (action.type) {
    case PET_OFFER_UPDATE_REQUEST:
      return { loading: true }
    case PET_OFFER_UPDATE_SUCCESS:
      return { loading: false, success: true, petOffer: action.payload }
    case PET_OFFER_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case PET_OFFER_UPDATE_RESET:
      return { petOffer: {} }
    default:
      return state
  }
}