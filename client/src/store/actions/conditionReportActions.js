import * as api from "../../api/index";
import {
  CONDITION_REPORTS_CREATE_REQUESTS,
  CONDITION_REPORTS_CREATE_SUCCESS,
  CONDITION_REPORTS_CREATE_FAIL,
  CONDITION_REPORTS_UPDATE_SUCCESS,
  CONDITION_REPORTS_UPDATE_FAIL,
  CONDITION_REPORTS_DELETE_SUCCESS,
  CONDITION_REPORTS_DELETE_FAIL,
  CONDITION_REPORTS_LIST_REQUESTS,
  CONDITION_REPORTS_LIST_SUCCESS,
  CONDITION_REPORTS_LIST_FAIL,
  CONDITION_REPORTS_DETAIL_REQUESTS,
  CONDITION_REPORTS_DETAIL_SUCCESS,
  CONDITION_REPORTS_DETAIL_FAIL,
  CONDITION_REPORTS_LIST_PET_REQUESTS,
  CONDITION_REPORTS_LIST_PET_SUCCESS,
  CONDITION_REPORTS_LIST_PET_FAIL,
  CONDITION_REPORTS_STATUS_REQUESTS,
  CONDITION_REPORTS_STATUS_SUCCESS,
  CONDITION_REPORTS_STATUS_FAIL,
} from "../../constants/conditionReportContants";

export const createReport = (id, reportData, history) => async (dispatch) => {
  try {
    dispatch({
      type: CONDITION_REPORTS_CREATE_REQUESTS,
    });

    history.push(`/reportslist/${id}`);
    const { data } = await api.createReport(id, reportData);
    dispatch({
      type: CONDITION_REPORTS_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONDITION_REPORTS_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateReport = (id, reportData, history) => async (dispatch) => {
  try {
    history.push("/reports");
    await api.updateReport(id, reportData);
    dispatch({
      type: CONDITION_REPORTS_UPDATE_SUCCESS,
      payload: reportData,
    });
  } catch (error) {
    dispatch({
      type: CONDITION_REPORTS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteReport = (id) => async (dispatch) => {
  try {
    await api.deleteReport(id);

    dispatch({
      type: CONDITION_REPORTS_DELETE_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: CONDITION_REPORTS_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const reportListByPet = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CONDITION_REPORTS_LIST_REQUESTS,
    });

    const { data } = await api.getReportByPet(id);

    dispatch({
      type: CONDITION_REPORTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONDITION_REPORTS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const reportListByAdoption = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CONDITION_REPORTS_LIST_REQUESTS,
    });

    const { data } = await api.getReportByAdoption(id);

    dispatch({
      type: CONDITION_REPORTS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONDITION_REPORTS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const reportList = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CONDITION_REPORTS_LIST_PET_REQUESTS,
    });

    const { data } = await api.getReportList(id);

    dispatch({
      type: CONDITION_REPORTS_LIST_PET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONDITION_REPORTS_LIST_PET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailReport = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CONDITION_REPORTS_DETAIL_REQUESTS,
    });

    const { data } = await api.getReportDetail(id);

    dispatch({
      type: CONDITION_REPORTS_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONDITION_REPORTS_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateStatusReport = (id, status) => async (dispatch) => {
  try {
    dispatch({
      type: CONDITION_REPORTS_STATUS_REQUESTS,
    });
    const { data } = await api.acceptReport(id, status);

    dispatch({
      type: CONDITION_REPORTS_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONDITION_REPORTS_STATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
