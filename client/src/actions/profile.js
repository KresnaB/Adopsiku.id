import { VIEW, FETCH_USERS } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const viewProfile = (id) => async(dispatch) => {
    try{
        const { data } = await api.viewProfile(id);

        dispatch({ type: VIEW, payload: data.adopter });

    } catch(error){
        console.log(error.message);
    }
}

export const getUsers = () => async (dispatch) => {
    try {
      const { data } = await api.fetchUsers();
  
      dispatch({ type: FETCH_USERS, payload: data.users });
    } catch (error) {
      console.log(error.message);
    }
};