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

export const provincesReducer = (state = { loading:false, province: [], regencies: [], cities: [], districts: [], villages:[] }, action) => {
    switch(action.type) {
        case GET_PROVINCES_REQUEST:
            return { ...state, loading: true }
        case GET_PROVINCES_SUCCESS:
            return { ...state, loading:false, province: action.payload };
        case GET_CITIES_SUCCESS:
            return { ...state, loading:false, cities: action.payload };
        case GET_DISTRICTS_SUCCESS:
            return { ...state, loading:false, districts: action.payload };
        case GET_VILLAGES_SUCCESS:
            return { ...state, loading:false, villages: action.payload };
        case GET_REGENCIES_REQUEST:
            return { ...state, loading: true }
        case GET_REGENCIES_SUCCESS:
            return { ...state, loading:false, regencies: action.payload };
        case GET_REGENCIES_FAIL:
            return { loading: false, error:action.payload }
        case GET_PROVINCES_FAIL:
            return { loading: false, error:action.payload }
        default:
            return state;
    }
}