import axios from "axios";
export const MakeRequest = axios.create({ baseURL: `${import.meta.env.VITE_Backend_Url}/api`, withCredentials: true })