import types from "../constants/filter";

const initialState = {
    sort_field: null,
    sort_direction: null,
    page: 1
};

export default function(state = initialState, action) {
    switch (action.type) {
        case types.EDIT_FILTER:
            return {
                sort_field: action.payload.sort_field,
                sort_direction: action.payload.sort_direction,
                page: action.payload.page,
            }
        default:
            return state;
    }
};
