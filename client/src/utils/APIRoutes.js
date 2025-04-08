import axios from "axios";

// const API_URL = "http://localhost:3000/api/auth";

// export const register = async (userData) => {
//     return axios.post(`${API_URL}/register`, userData, { withCredentials: true });
// };

// export const login = async (userData) => {
//     return axios.post(`${API_URL}/login`, userData, { withCredentials: true });
// };

// export const checkAuthStatus = async () => {
//     return `${API_URL}/status`, );
// };

// export const Order = async (userData) => {
//     return axios.post(`${API_URL}/order`, userData, { withCredentials: true });
// };


export const API_URL = "https://ecommaterialui.onrender.com";

export const checkAuthStatus =`${API_URL}/api/auth/status`;

export const register =`${API_URL}/api/auth/register`;

export const login = `${API_URL}/api/auth/login`;

export const logout = async () => {
    return axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
};

export const Order =`${API_URL}/api/auth/order`;

export const fetchProducts = `${API_URL}/api/products`;

export const createOrder = `${API_URL}/api/order/postdata`;

export const cancelOrder = `${API_URL}/api/order/delete`;

export const fetchUsers =  `${API_URL}/api/customers`;

export const updateOrders = `${API_URL}/api/order/updateStatus`;

export const fetchOrders = `${API_URL}/api/order/getAllOrders`;