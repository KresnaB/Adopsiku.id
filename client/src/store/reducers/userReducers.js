import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_VERIFICATION_REQUEST,
    USER_VERIFICATION_SUCCESS,
    USER_VERIFICATION_FAIL,
    USER_PROFILE_REQUEST,
    USER_PROFILE_SUCCESS,
    USER_PROFILE_FAIL,
    USER_PROFILE_UPDATE_REQUEST,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_PROFILE_UPDATE_FAIL,
    PROVIDER_DETAIL_REQUEST,
    PROVIDER_DETAIL_SUCCESS,
    PROVIDER_DETAIL_FAIL,
} from '../../constants/userConstants';

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_LOGIN_REQUEST:
        return { loading: true }
      case USER_LOGIN_SUCCESS:
        console.log(action.payload);
        return { loading: false, userInfo: action.payload }
      case USER_LOGIN_FAIL:
        return { loading: false, error: action.payload }
      case USER_LOGOUT:
        return {}
      default:
        return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const emailVerificationReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_VERIFICATION_REQUEST:
      return { loading: true }
    case USER_VERIFICATION_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_VERIFICATION_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { loading: true }
    case USER_PROFILE_SUCCESS:
      return { loading: false, userInfo: action.payload.user }
    case USER_PROFILE_FAIL:
      return { loading: false, error: action.payload }
      case USER_PROFILE_UPDATE_REQUEST:
        return { loading: true }
      case USER_PROFILE_UPDATE_SUCCESS:
        return { loading: false, userInfo: action.payload }
      case USER_PROFILE_UPDATE_FAIL:
        return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const providerDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case PROVIDER_DETAIL_REQUEST:
      return { loading: true }
    case PROVIDER_DETAIL_SUCCESS:
      return { loading: false , providerInfo: action.payload }
    case PROVIDER_DETAIL_FAIL:
      return { loading: false , error : action.payload }
    default:
      return state
  }
}