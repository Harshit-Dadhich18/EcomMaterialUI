import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

export const register = async (userData) => {
    return axios.post(`${API_URL}/register`, userData, { withCredentials: true });
};

export const login = async (userData) => {
    return axios.post(`${API_URL}/login`, userData, { withCredentials: true });
};

export const logout = async () => {
    return axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
};

export const checkAuthStatus = async () => {
    return axios.get(`${API_URL}/status`, { withCredentials: true });
};

export const Order = async (userData) => {
    return axios.post(`${API_URL}/order`, userData, { withCredentials: true });
};