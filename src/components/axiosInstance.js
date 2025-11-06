import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

// Add the access token to every request
API.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 Unauthorized (expired token)
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // if access token expired and this is first retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const oldAccessToken = localStorage.getItem("access_token");
        // Ask backend for a new access token
        const refreshResponse = await axios.post("http://localhost:8000/token/refresh", {
          old_access_token: oldAccessToken,
        });

        const newAccessToken = refreshResponse.data.access_token;

        // Store new token
        localStorage.setItem("access_token", newAccessToken);

        // Update headers and retry the original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return API(originalRequest);
      } catch (refreshError) {
        console.error("🔐 Token refresh failed:", refreshError);
        localStorage.removeItem("access_token");
        window.location.href = "/login"; // redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default API;