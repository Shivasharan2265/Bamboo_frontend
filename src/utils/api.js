// src/utils/api.js
import axios from "axios";

// Centralized API base URL
const API_BASE_URL = "https://bamboo-backend.onrender.com/api";

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
