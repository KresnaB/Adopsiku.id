import indonesia from 'territory-indonesia';
import { 
    GET_PROVINCES_REQUEST,
    GET_PROVINCES_SUCCESS,
    GET_CITIES_SUCCESS,
    GET_DISTRICTS_SUCCESS,
    GET_VILLAGES_SUCCESS,
    GET_PROVINCES_FAIL,
    GET_REGENCIES_REQUEST,
    GET_REGENCIES_SUCCESS,
    GET_REGENCIES_FAIL
 } from '../../constants/provinceConstants';

export const getAllProvinces = () => async(dispatch) => {
    try{
        dispatch({
            type: GET_PROVINCES_REQUEST,
        })

        const  data  = await indonesia.getAllProvinces();

        dispatch({ type: GET_PROVINCES_SUCCESS, payload: data });
    } catch(error){
        dispatch({
            type: GET_PROVINCES_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const getAllCities = () => async(dispatch) => {
    try{
        dispatch({
            type: GET_REGENCIES_REQUEST,
        })

        const  data  = await indonesia.getAllRegencies();

        dispatch({ type: GET_REGENCIES_SUCCESS, payload: data });
    } catch(error){
        dispatch({
            type: GET_REGENCIES_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const getCityById = (provinceId) => async(dispatch) => {
    try{
        dispatch({
            type: GET_PROVINCES_REQUEST,
        })

        const  data  = await indonesia.getRegenciesOfProvinceId(provinceId);

        dispatch({ type: GET_CITIES_SUCCESS, payload: data });
    } catch(error){
        dispatch({
            type: GET_PROVINCES_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const getDistricts = (cityId) => async(dispatch) => {
    try{
        dispatch({
            type: GET_PROVINCES_REQUEST,
        })

        const  data  = await indonesia.getDistrictsOfRegencyId(cityId);

        dispatch({ type: GET_DISTRICTS_SUCCESS, payload: data });
    } catch(error){
        dispatch({
            type: GET_PROVINCES_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}

export const getVillage = (districtId) => async(dispatch) => {
    try{
        dispatch({
            type: GET_PROVINCES_REQUEST,
        })

        const  data  = await indonesia.getVillagesOfDistrictId(districtId);

        dispatch({ type: GET_VILLAGES_SUCCESS, payload: data });
    } catch(error){
        dispatch({
            type: GET_PROVINCES_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}