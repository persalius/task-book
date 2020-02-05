import types from "../constants/tasks";

// get tasks
export function tasks_request(payload, isServer) {
    return {
        type: types.TASKS_REQUEST,
        payload,
        isServer
    };
}

export function tasks_success(data) {
    return {
        type: types.TASKS_SUCCESS,
        payload: data
    };
}

export function tasks_failure(payload) {
    return {
        type: types.TASKS_FAILURE,
        payload
    };
}


// Create new task
export function add_task_request(payload) {
    return {
        type: types.ADD_TASK_REQUEST,
        payload
    };
}

export function add_task_success(payload) {
    return {
        type: types.ADD_TASK_SUCCESS,
        payload
    };
}

export function add_task_failure(payload) {
    return {
        type: types.ADD_TASK_FAILURE,
        payload
    };
}

// Edit task
export function edit_task_request(payload) {
    return {
        type: types.EDIT_TASK_REQUEST,
        payload
    };
}

export function edit_task_success(payload) {
    return {
        type: types.EDIT_TASK_SUCCESS,
        payload
    };
}

export function edit_task_failure(payload) {
    return {
        type: types.EDIT_TASK_FAILURE,
        payload
    };
}
