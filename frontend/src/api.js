import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8080/backend",
});
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("HTTP 요청 에러:", error);
    return Promise.reject(error);
  }
);

export const BASE_URL = "http://localhost:8080/backend";
