import types from "../constants/tasks";

const initialState = {
    items: [],
    totalTasks: 0,
    error: false,
    isCreateTask: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case types.TASKS_SUCCESS:
            return {
                ...state,
                items: action.payload.tasks,
                totalTasks: action.payload["total_task_count"],
                error: false
            };
        case types.ADD_TASK_REQUEST:
            return {
                ...state,
                isCreateTask: false
            }
        case types.ADD_TASK_SUCCESS:
            return {
                ...state,
                error: false,
                isCreateTask: true
            }
        case types.TASKS_FAILURE:
        case types.EDIT_TASK_FAILURE:
            return {
                ...state,
                error: action.payload
            };
        case types.ADD_TASK_FAILURE:
            return {
                ...state,
                error: action.payload,
                isCreateTask: false
            };
        case types.EDIT_TASK_REQUEST:
            return {
                ...state,
                error: false
            };
        default:
            return state;
    }
};
