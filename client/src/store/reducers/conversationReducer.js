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

export const conversationCreateReducer = (
  state = { conversation: {} },
  action
) => {
  switch (action.type) {
    case CONVERSATION_CREATE_REQUEST:
      return { loading: true };
    case CONVERSATION_CREATE_SUCCESS:
      return { loading: false, conversation: action.payload };
    case CONVERSATION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const conversationListReducer = (state = {}, action) => {
  switch (action.type) {
    case CONVERSATION_LIST_REQUEST:
      return { loading: true };
    case CONVERSATION_LIST_SUCCESS:
      return { loading: false, conversations: action.payload.conversations };
    case CONVERSATION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const messageCreateReducer = (state = { message: {} }, action) => {
  switch (action.type) {
    case MESSAGE_CREATE_REQUEST:
      return { loading: true };
    case MESSAGE_CREATE_SUCCESS:
      return { loading: false, message: action.payload };
    case MESSAGE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const messageListReducer = (state = { messages: {} }, action) => {
  switch (action.type) {
    case MESSAGE_LIST_REQUEST:
      return { loading: true };
    case MESSAGE_LIST_SUCCESS:
      return { loading: false, messages: action.payload };
    case MESSAGE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const archivesReducer = (state = { messages: {} }, action) => {
  switch (action.type) {
    case ARCHIVES_LIST_REQUEST:
      return { loading: true };
    case ARCHIVES_LIST_SUCCESS:
      return { loading: false, messages: action.payload };
    case ARCHIVES_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
