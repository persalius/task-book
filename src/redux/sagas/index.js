import { all, fork } from "redux-saga/effects";
import rootAuth from "./auth";
import rootTasks from "./tasks";

export default function* rootSaga() {
    yield all([
        fork(rootAuth),
        fork(rootTasks)
    ]);
}
