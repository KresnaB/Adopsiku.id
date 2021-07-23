import * as api from "../../api/index";
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
} from "../../constants/userConstants";

export const login = (loginData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const { data } = await api.login(loginData);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  document.location.href = "/login";
};

export const registerAdopter = (formData, history) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const { data } = await api.registerAdopter(formData);

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
    history.push("/emailsent");
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const registerIndProvider = (formData, history) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const { data } = await api.registerIndProvider(formData);

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
    history.push("/emailsent");
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const registerOrgProvider = (formData, history) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const { data } = await api.registerOrgProvider(formData);

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
    history.push("/emailsent");
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const emailVerification = (token, history) => async (dispatch) => {
  try {
    dispatch({
      type: USER_VERIFICATION_REQUEST,
    });
    const { data } = await api.emailConfirmation(token);

    dispatch({ type: USER_VERIFICATION_SUCCESS, payload: data });

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
    history.push("/profilecompletions");
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: USER_VERIFICATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    if (error) if (error.response.status === 401) history.push("/resend");
  }
};

export const resendEmail = (formData, history) => async (dispatch) => {
  try {
    console.log(formData);
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const { data } = await api.emailConfirmationResend(formData);

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    history.push("/emailsent");
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const googleRegisterAdopter =
  (formData, history) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const { data } = await api.registerAdopter(formData);

      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

      history.push("/profilecompletions");
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const viewProfile = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_PROFILE_REQUEST,
    });
    const { data } = await api.viewProfile(id);
    dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateAdopter = (id, adopter, history) => async (dispatch) => {
  try {
    dispatch({
      type: USER_PROFILE_UPDATE_REQUEST,
    });

    const { data } = await api.updateAdopter(id, adopter);
    dispatch({
      type: USER_PROFILE_UPDATE_SUCCESS,
      payload: data.updatedAdopter,
    });

    document.location.href = "/myprofile";
  } catch (error) {
    dispatch({
      type: USER_PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateIndProvider = (id, adopter, history) => async (dispatch) => {
  try {
    dispatch({
      type: USER_PROFILE_UPDATE_REQUEST,
    });

    const { data } = await api.updateIndProvider(id, adopter);

    dispatch({
      type: USER_PROFILE_UPDATE_SUCCESS,
      payload: data.updatedIndividual,
    });
    console.log(data.updatedIndividual);

    document.location.href = "/dashboard/myprofile";
  } catch (error) {
    dispatch({
      type: USER_PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateOrgProvider = (id, adopter, history) => async (dispatch) => {
  try {
    dispatch({
      type: USER_PROFILE_UPDATE_REQUEST,
    });

    const { data } = await api.updateOrgProvider(id, adopter);

    dispatch({
      type: USER_PROFILE_UPDATE_SUCCESS,
      payload: data.updatedOrganization,
    });
    console.log(data.updatedOrganization);

    document.location.href = "/dashboard/myprofile";
  } catch (error) {
    dispatch({
      type: USER_PROFILE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const providerDetail = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PROVIDER_DETAIL_REQUEST,
    });

    const { data } = await api.getProviderDetail(id);

    dispatch({ type: PROVIDER_DETAIL_SUCCESS, payload: data });
    console.log(data);
  } catch (error) {
    dispatch({
      type: PROVIDER_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
