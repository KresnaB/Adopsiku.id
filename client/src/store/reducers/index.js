import { combineReducers } from "redux";

import {
  petOfferListReducer,
  petOfferDetailsReducer,
  userPetOfferListReducer,
  petOfferCreateReducer,
  petOfferUpdateReducer,
  providerPetsReducer,
} from "./petOfferReducers";

import {
  conversationCreateReducer,
  conversationListReducer,
  messageCreateReducer,
  messageListReducer,
  archivesReducer,
} from "./conversationReducer";

import {
  adoptionReqCreateReducer,
  adoptionReqListReducer,
  adoptionReqDetailReducer,
  adoptionReqUpdateReducer,
  provAdoptionReqListReducer,
} from "./adoptionRequestReducers";

import {
  userLoginReducer,
  userRegisterReducer,
  userProfileReducer,
  providerDetailReducer,
  emailVerificationReducer,
} from "./userReducers";

import {
  conReportCreateReducer,
  conReportListReducer,
  ReportsListReducer,
  conReportDetailReducer,
} from "./conditionReportReducers";

import { provincesReducer } from "./provincesReducer";

export const reducers = combineReducers({
  petOfferList: petOfferListReducer,
  petOfferDetails: petOfferDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userVerified: emailVerificationReducer,
  userProfile: userProfileReducer,
  userPetOfferList: userPetOfferListReducer,
  petOfferCreate: petOfferCreateReducer,
  provinces: provincesReducer,
  petOfferUpdate: petOfferUpdateReducer,
  providerPets: providerPetsReducer,
  providerDetail: providerDetailReducer,
  adoptionReqCreate: adoptionReqCreateReducer,
  adoptionReqList: adoptionReqListReducer,
  adoptionReqDetail: adoptionReqDetailReducer,
  adoptionReqUpdate: adoptionReqUpdateReducer,
  provAdoptionReqList: provAdoptionReqListReducer,
  reportCreate: conReportCreateReducer,
  reportList: conReportListReducer,
  petReportList: ReportsListReducer,
  reportDetail: conReportDetailReducer,
  conversationCreate: conversationCreateReducer,
  conversationList: conversationListReducer,
  messageCreate: messageCreateReducer,
  messageList: messageListReducer,
  archiveList: archivesReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

export const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};
