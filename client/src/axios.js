import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8001"
})

instance.defaults.withCredentials = true

export default instance