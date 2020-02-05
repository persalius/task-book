import types from "../constants/auth";

const initialState = {
    token: "",
    error: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return {
                ...state,
                error: false
            }
        case types.LOGIN_SUCCESS:
            return {
                token: action.payload.token,
                error: false
            };
        case types.LOGIN_FAILURE:
            return {
                token: "",
                error: action.payload
            };
        case types.LOGOUT_SUCCESS:
            return {
                ...state,
                token: ""
            };
        case types.LOGOUT_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
};
