import axios from "axios";

export const MakeRequest = axios.create({ baseURL: "http://localhost:3000/api", withCredentials: true })