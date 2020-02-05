import types from "../constants/filter";

export function edit_filter(payload) {
    return {
        type: types.EDIT_FILTER,
        payload
    };
}
