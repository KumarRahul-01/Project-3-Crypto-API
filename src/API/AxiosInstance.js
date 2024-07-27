// AxiosInstance.js
import axios from "axios";
import { baseURL } from "./EndPoints";

const AxiosInstance = axios.create({
  baseURL,
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default AxiosInstance;
