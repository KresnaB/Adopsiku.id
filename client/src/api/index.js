import axios from "axios";

const API = axios.create({ baseURL: "https://adopsiku.herokuapp.com" });

// const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

//auth
export const login = (formData) => API.post("/users/signin", formData);
export const googleSignIn = (formData) =>
  API.post("/users/googleSignIn", formData);
export const registerAdopter = (formData) =>
  API.post("/users/register/adopter", formData);
export const registerIndProvider = (formData) =>
  API.post("/users/register/indProvider", formData);
export const registerOrgProvider = (formData) =>
  API.post("/users/register/orgProvider", formData);
export const emailConfirmation = (token) =>
  API.put(`/users/confirmation/${token}`);
export const emailConfirmationResend = (formData) =>
  API.post(`/users/resend`, formData);

//profile
export const fetchUsers = () => API.get("/users");
export const viewProfile = (id) => API.get(`/users/${id}`);
export const updateAdopter = (id, updatedProfile) =>
  API.put(`/users/${id}`, updatedProfile);
export const updateIndProvider = (id, updatedProfile) =>
  API.put(`/users/${id}`, updatedProfile);
export const updateOrgProvider = (id, updatedProfile) =>
  API.put(`/users/${id}`, updatedProfile);

//petoffer
export const getPetOffers = (query) => API.get(`/petOffers/${query}`);
export const viewPetDetail = (id) => API.get(`/petOffers/${id}`);
export const deletePetOffer = (provid, id) =>
  API.delete(`/petOffers/${provid}/${id}`);
export const getProviderPets = (id) =>
  API.get(`/petOffers/providerProfile/${id}`);

// Create Pet Offer
export const createCatOffer = (newOffer) =>
  API.post("/petOffers/catOffers", newOffer);
export const createDogOffer = (newOffer) =>
  API.post("/petOffers/dogOffers", newOffer);
export const createFishOffer = (newOffer) =>
  API.post("/petOffers/fishOffers", newOffer);
export const createRabbitOffer = (newOffer) =>
  API.post("/petOffers/rabbitOffers", newOffer);
export const createBirdOffer = (newOffer) =>
  API.post("/petOffers/birdOffers", newOffer);
export const createFuryOffer = (newOffer) =>
  API.post("/petOffers/furyOffers", newOffer);
export const createChickenOffer = (newOffer) =>
  API.post("/petOffers/chickenOffers", newOffer);
export const createTurtleOffer = (newOffer) =>
  API.post("/petOffers/turtleOffers", newOffer);

// Update Pet Offer
export const updateCatOffer = (id, updatedOffer) =>
  API.put(`/petOffers/${id}`, updatedOffer);
export const updateDogOffer = (id, updatedOffer) =>
  API.put(`/petOffers/${id}`, updatedOffer);
export const updateFishOffer = (id, updatedOffer) =>
  API.put(`/petOffers/${id}`, updatedOffer);
export const updateRabbitOffer = (id, updatedOffer) =>
  API.put(`/petOffers/${id}`, updatedOffer);
export const updateBirdOffer = (id, updatedOffer) =>
  API.put(`/petOffers/${id}`, updatedOffer);
export const updateFuryOffer = (id, updatedOffer) =>
  API.put(`/petOffers/${id}`, updatedOffer);
export const updateChickenOffer = (id, updatedOffer) =>
  API.put(`/petOffers/${id}`, updatedOffer);
export const updateTurtleOffer = (id, updatedOffer) =>
  API.put(`/petOffers/${id}`, updatedOffer);

export const getPetOffersByProviderID = (provID) =>
  API.get(`/petOffers/prov/${provID}`);
export const updateStatusPetOffer = (id, status) =>
  API.put(`/petOffers/status/${id}`, status);
export const setReportDuration = (id, durationData) =>
  API.put(`/petOffers/reportduration/${id}`, durationData);
export const getProviderDetail = (id) => API.get(`/users/provider/${id}`);

// Adoption Request
export const applyAdoption = (adoptionData) =>
  API.post("/adoptions/apply", adoptionData);
export const getAdoptionsByAdopter = (adopterId) =>
  API.get(`/adoptions/adopter/${adopterId}`);
export const getAdoptionsByProvider = (providerId) =>
  API.get(`/adoptions/provider/${providerId}`);
export const cancelAdoption = (adoptionId) =>
  API.delete(`/adoptions/cancel/${adoptionId}`);
export const getAdoptionDetail = (adoptionId) =>
  API.get(`/adoptions/detail/${adoptionId}`);
export const updateAdoption = (adoptionId, updatedAdoption) =>
  API.put(`/adoptions/update/${adoptionId}`, updatedAdoption);
export const updateAdoptionStatus = (adoptionId, updatedStatus) =>
  API.put(`/adoptions/updateStatus/${adoptionId}`, updatedStatus);

// Condition Report
export const createReport = (id, reportData) =>
  API.post(`/reports/create/${id}`, reportData);
export const updateReport = (id, reportData) =>
  API.put(`/reports/update/${id}`, reportData);
export const deleteReport = (id) => API.delete(`/reports/delete/${id}`);
export const getReportByPet = (id) => API.get(`/reports/pet/${id}`);
export const getReportList = (id) => API.get(`/reports/list/${id}`);
export const getReportByAdoption = (id) => API.get(`/reports/adoption/${id}`);
export const getReportDetail = (id) => API.get(`/reports/detail/${id}`);
export const acceptReport = (id, status) =>
  API.put(`/reports/updatestatus/${id}`, status);

// Chat Conversations
export const getUserConversations = (userId) =>
  API.get(`/conversations/user/${userId}`);
export const createConversation = (newConversation) =>
  API.post("/conversations/", newConversation);
export const getMessages = (conversationId) =>
  API.get(`/conversations/${conversationId}`);
export const getArchives = (conversationId) =>
  API.get(`/conversations/archives/${conversationId}`);
export const sendMessage = (conversationId, newMessage) =>
  API.post(`/conversations/${conversationId}`, newMessage);
