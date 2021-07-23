import { AUTH, GOOGLE_AUTH, UNCOMPLETED_AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer = (auth = {authData: null}, action) => {
    switch(action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({ ...action?.data}))
            return { ...auth, authData: action.data };
        case GOOGLE_AUTH:
            localStorage.setItem('googleData', JSON.stringify({ ...action?.data}))
            return { ...auth, authData: action.data };
        case UNCOMPLETED_AUTH:
            localStorage.removeItem('googleData')
            return { ...auth, authData: action.data };
        case LOGOUT:
            localStorage.removeItem('cartItems')
            localStorage.removeItem('paymentMethod')
            localStorage.removeItem('shippingAddress')
            localStorage.clear();
            return { ...auth, authData: null };
        default:
            return auth;
    }
}

export default authReducer;