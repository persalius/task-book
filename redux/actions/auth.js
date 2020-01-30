import types from "../constants/auth";

export function login_request(payload) {
    return {
        type: types.LOGIN_REQUEST,
        payload
    };
}

export function login_success(data) {
    return {
        type: types.LOGIN_SUCCESS,
        payload: data
    };
}

export function login_failure(error) {
    return {
        type: types.LOGIN_FAILURE,
        payload: error
    };
}

export function logout_request() {
    return {
        type: types.LOGOUT_REQUEST
    };
}

export function logout_success(data) {
    return {
        type: types.LOGOUT_SUCCESS,
        payload: data
    };
}

export function logout_failure(data) {
    return {
        type: types.LOGOUT_FAILURE,
        payload: data
    };
}
