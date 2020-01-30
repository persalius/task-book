import { all, put, takeLatest } from 'redux-saga/effects';
import types from "../constants/tasks";
import * as actions from "../actions/tasks";
import callApi from "../../utils/call-api";

function createFormForTasks(state) {
    let sort_field = state.payload && state.payload.sort_field || "id";
    let sort_direction = state.payload && state.payload.sort_direction || "asc";
    let page = state.payload && state.payload.page || "1";
    let form = `&sort_field=${sort_field}&sort_direction=${sort_direction}&page=${page}`;
    return form;
}

// get tasks
function* loadTasks(state) {
    try {
        let form;
        if (!state.isServer) {
            form = createFormForTasks(state);
        }
        const data = yield callApi({form, getTasks: true}, null, "/");
        yield put(actions.tasks_success(data));
    } catch (error) {
        yield put(actions.tasks_failure(error.message));
    }
}

// add new task
function* createTask(state) {
    try {
        const {username, email, text} = state.payload[0];
        const {sort_field, sort_direction, page} = state.payload[1];
        let form = new FormData();
        form.append("username", username);
        form.append("email", email);
        form.append("text", text);
        const data = yield callApi(form, {method: "POST"}, "/create");
        yield put(actions.add_task_success(data));
        yield put(actions.tasks_request({sort_field, sort_direction, page}));
    } catch (error) {
        yield put(actions.add_task_failure(JSON.parse(error.message)));
    }
}

// edit task
function* editTask(state) {
    try {
        const {id, token} = state.payload[0];
        let form = new FormData();
        if (state.payload[0].status) {
            form.append("status", state.payload[0].status);}
        if (state.payload[0].text) {
            form.append("text", state.payload[0].text);
        }
        form.append("token", token);

        const data = yield callApi(form, {method: "POST"}, `/edit/${id}`);
        yield put(actions.edit_task_success(data));
        yield put(actions.tasks_request({...state.payload[1]}));
    } catch (error) {
        yield put(actions.edit_task_failure(error.message));
    }
}

function* rootSaga() {
    yield all([
        yield takeLatest(types.TASKS_REQUEST, loadTasks),
        yield takeLatest(types.ADD_TASK_REQUEST, createTask),
        yield takeLatest(types.EDIT_TASK_REQUEST, editTask),
    ])
}

export default rootSaga;
