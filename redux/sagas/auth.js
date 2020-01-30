import { all, put, takeLatest } from 'redux-saga/effects';
import types from "../constants/auth";
import * as actions from "../actions/auth";
import callApi from "../../utils/call-api";
import {setCookie, deleteCookie} from "../../utils/cookie";


function* loadLogin(state) {
    try {
        const {username, password} = state.payload;
        let form = new FormData();
        form.append("username", username);
        form.append("password", password);
        const data = yield callApi(form, {method: "POST"}, "/login");
        yield setCookie("token", data.token);
        yield put(actions.login_success(data));
    } catch (error) {
        yield put(actions.login_failure(JSON.parse(error.message)));
    }
}

function* loadLogout() {
    try {
        yield deleteCookie("token");
        yield put(actions.logout_success());
    } catch (error) {
        yield put(error.message);
    }
}

function* rootSaga() {
    yield all([
        yield takeLatest(types.LOGIN_REQUEST, loadLogin),
        yield takeLatest(types.LOGOUT_REQUEST, loadLogout)
    ])
}

export default rootSaga;
