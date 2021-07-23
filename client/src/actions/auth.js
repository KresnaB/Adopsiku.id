import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';

export const signin = (formData, history) => async(dispatch) => {
    try{
        const { data } = await api.login(formData);

        dispatch({ type: AUTH, data });

        history.push('/');
    } catch(error){
        console.log(error);
    }
}

export const googleSignIn = (formData, history) => async(dispatch) => {
    try{
        const { data } = await api.googleSignIn(formData);

        dispatch({ type: AUTH, data });

        history.push('/petOffers');
    } catch(error){
        console.log(error);
    }
}

export const registerAdopter = (formData, history) => async(dispatch) => {
    try{
        const { data } = await api.registerAdopter(formData);

        dispatch({ type: AUTH, data });

        history.push('/profilecompletions');
    } catch(error){
        console.log(error);
    }
}

export const registerIndProvider = (formData, history) => async(dispatch) => {
    try{
        const { data } = await api.registerIndProvider(formData);

        dispatch({ type: AUTH, data });

        history.push('/profilecompletions');
    } catch(error){
        console.log(error);
    }
}

export const registerOrgProvider = (formData, history) => async(dispatch) => {
    try{
        const { data } = await api.registerOrgProvider(formData);

        dispatch({ type: AUTH, data });

        history.push('/profilecompletions');
    } catch(error){
        console.log(error);
    }
}

