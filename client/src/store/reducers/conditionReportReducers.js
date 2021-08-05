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

export const conReportCreateReducer = (
  state = { conditionReport: {} },
  action
) => {
  switch (action.type) {
    case CONDITION_REPORTS_CREATE_REQUESTS:
      return { loading: true };
    case CONDITION_REPORTS_CREATE_SUCCESS:
      return { loading: false, conditionReport: action.payload };
    case CONDITION_REPORTS_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const conReportListReducer = (
  state = { conditionReport: {} },
  action
) => {
  switch (action.type) {
    case CONDITION_REPORTS_LIST_REQUESTS:
      return { loading: true };
    case CONDITION_REPORTS_LIST_SUCCESS:
      return { loading: false, conditionReport: action.payload };
    case CONDITION_REPORTS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ReportsListReducer = (state = { conditionReport: {} }, action) => {
  switch (action.type) {
    case CONDITION_REPORTS_LIST_PET_REQUESTS:
      return { loading: true };
    case CONDITION_REPORTS_LIST_PET_SUCCESS:
      return { loading: false, conditionReport: action.payload };
    case CONDITION_REPORTS_LIST_PET_FAIL:
      return { loading: false, error: action.payload };
    case CONDITION_REPORTS_DELETE_SUCCESS:
      const reportDelete = state.conditionReport.conditionReports.filter(
        (conditionReport) => conditionReport._id !== action.payload
      );
      state.conditionReport.conditionReports = reportDelete;
      return {
        loading: false,
        conditionReport: state.conditionReport,
      };
    case CONDITION_REPORTS_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case CONDITION_REPORTS_UPDATE_SUCCESS:
      const update = state.conditionReport.conditionReports.map(
        (conditionReport) =>
          conditionReport._id === action.payload._id
            ? action.payload
            : conditionReport
      );
      state.conditionReport.conditionReports = update;
      return {
        loading: false,
        conditionReport: state.conditionReport,
      };
    case CONDITION_REPORTS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const conReportDetailReducer = (
  state = { conditionReport: {} },
  action
) => {
  switch (action.type) {
    case CONDITION_REPORTS_DETAIL_REQUESTS:
      return { loading: true };
    case CONDITION_REPORTS_DETAIL_SUCCESS:
      return { loading: false, conditionReport: action.payload };
    case CONDITION_REPORTS_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reportUpdateStatusReducer = (
  state = { conditionReport: {} },
  action
) => {
  switch (action.type) {
    case CONDITION_REPORTS_STATUS_REQUESTS:
      return { loading: true };
    case CONDITION_REPORTS_STATUS_SUCCESS:
      return { loading: false, conditionReport: action.payload };
    case CONDITION_REPORTS_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
