import axios from "axios";
import { toast } from "react-toastify";
import { fromStorage } from "../lib";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

http.interceptors.response.use(
  (response) => {
    if ("message" in response?.data) {
      toast.success(response.data.message);
    }
    return response;
  },
  (error) => {
    if ("message" in error?.response?.data) {
      toast.error(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

http.interceptors.request.use(
  (config) => {
    const token = fromStorage("mern");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default http;
