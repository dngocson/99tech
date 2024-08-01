import axios from "axios";
const API_KEY = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL: `https://v6.exchangerate-api.com/v6/${API_KEY}`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    // Get access token from local storage
    return config;
  },
  function (error) {
    // Handle request error
    console.error("Request error", error);
    return Promise.reject(error);
  }
);

// Handle response error
api.interceptors.response.use(
  function (response) {
    // Handle response data
    return response;
  },
  function (error) {
    if (error.response) {
      if (error.response.status === 401) {
        // Handle 401 Error
        console.error("401 Error", error);
      }

      if (error.response?.data?.responseInfo) {
        const errors = error.response.data.responseInfo.errors;
        if (errors && errors.length > 0) {
          const error = errors[0];
          if (error?.message) {
            return Promise.reject(error);
          }
        }
      }
    }
    console.error("Response error", error);
    return Promise.reject(error);
  }
);

export default api;
