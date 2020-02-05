import axios from "axios";
import config from "../../config";

export default function callApi(payload, options, endpoint, token) {
    const method = options && options.method ? options.method : "GET";
    let url = `${config.API_URI}${endpoint}?developer=sergey`;

    if (payload.getTasks && payload.form) {
        // url для получения списка задач
        url = `${config.API_URI}${endpoint}?developer=sergey${payload.form}`;
    }

    let mime = "";
    if (method === "POST") {
        mime = "multipart/form-data";
    } else {
        mime = "application/json"
    }

    return axios({
        method,
        headers: {
            "Accept": "application/json",
            'Content-Type': mime,
        },
        data: payload,
        url,
        ...options,
    })
        .then(result => {
            if (result.data.status === "ok") {
                return result.data.message;
            }

            if (result.data.status === "error") {
                throw new Error(JSON.stringify(result.data.message));
            }

            throw new Error(result.data.message);
        })
}
