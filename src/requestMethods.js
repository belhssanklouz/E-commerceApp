import axios from "axios";
const BASE_URL = "https://backend-ecommerce-qoka.onrender.com/api/"
const TOKEN = JSON.parse(localStorage.getItem("user"))

export const publicRequest = axios.create({
    baseURL:BASE_URL,
});

export const userRequest = axios.create({
    baseURL:BASE_URL,
    headers:{token:`Bearer ${TOKEN}`},
})
