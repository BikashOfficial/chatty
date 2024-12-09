import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "https://chatty-backend-w4ht.onrender.com/":"/api",
    withCredentials: true
})
