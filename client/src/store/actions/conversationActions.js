import * as api from "../../api/index";
import {
  CONVERSATION_LIST_REQUEST,
  CONVERSATION_LIST_SUCCESS,
  CONVERSATION_LIST_FAIL,
  CONVERSATION_CREATE_REQUEST,
  CONVERSATION_CREATE_SUCCESS,
  CONVERSATION_CREATE_FAIL,
  MESSAGE_LIST_REQUEST,
  MESSAGE_LIST_SUCCESS,
  MESSAGE_LIST_FAIL,
  MESSAGE_CREATE_REQUEST,
  MESSAGE_CREATE_SUCCESS,
  MESSAGE_CREATE_FAIL,
  ARCHIVES_LIST_REQUEST,
  ARCHIVES_LIST_SUCCESS,
  ARCHIVES_LIST_FAIL,
} from "../../constants/conversationConstants";

export const createConversation =
  (newConversation, history) => async (dispatch) => {
    try {
      dispatch({
        type: CONVERSATION_CREATE_REQUEST,
      });
      const { data } = await api.createConversation(newConversation);
      dispatch({
        type: CONVERSATION_CREATE_SUCCESS,
        payload: data,
      });
      history.replace("/conversations");
    } catch (error) {
      dispatch({
        type: CONVERSATION_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getUserConversations = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: CONVERSATION_LIST_REQUEST,
    });

    const { data } = await api.getUserConversations(userId);

    dispatch({
      type: CONVERSATION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CONVERSATION_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMessages = (conversationId) => async (dispatch) => {
  try {
    dispatch({
      type: MESSAGE_LIST_REQUEST,
    });

    const { data } = await api.getMessages(conversationId);

    dispatch({
      type: MESSAGE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MESSAGE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const sendMessage = (conversationId, newMessage) => async (dispatch) => {
  try {
    dispatch({
      type: MESSAGE_CREATE_REQUEST,
    });

    const { data } = await api.sendMessage(conversationId, newMessage);

    dispatch({
      type: MESSAGE_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MESSAGE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getArchives = (conversationId) => async (dispatch) => {
  try {
    dispatch({
      type: ARCHIVES_LIST_REQUEST,
    });
    const { data } = await api.getArchives(conversationId);

    dispatch({
      type: ARCHIVES_LIST_SUCCESS,
      payload: data.messages,
    });
  } catch (error) {
    dispatch({
      type: ARCHIVES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
