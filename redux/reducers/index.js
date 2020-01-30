import {combineReducers} from "redux";
import auth from "./auth";
import tasks from "./tasks";
import filter from "./filter";

export default combineReducers({
    auth,
    tasks,
    filter
});
