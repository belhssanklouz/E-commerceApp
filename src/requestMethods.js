import axios from "axios";
const BASE_URL = "http://localhost:5000/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNmE3MzM5Njk1ZGEwN2RkODY1OWNhYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MjM3Nzc3NiwiZXhwIjoxNjUyNjM2OTc2fQ.tq7h-GfIZS96TOVCRvePCemxuGT62J4l56ckvlmSXfs"

export const publicRequest = axios.create({
    baseURL:BASE_URL,
});

export const userRequest = axios.create({
    baseURL:BASE_URL,
    header:{token:`Bearer ${TOKEN}`},
})