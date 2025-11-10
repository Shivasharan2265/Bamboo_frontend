// src/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://bamboo-backend-l209.onrender.com/api", // change to your uploaded backend URL
});

// Inject token automatically (if logged in)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
