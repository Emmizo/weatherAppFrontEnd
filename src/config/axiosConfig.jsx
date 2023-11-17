import axios from "axios";
import BaseURL from "../BaseURL";

const instance = axios.create({
  baseURL: BaseURL,
});
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log(token);
  }
  return config;
});

export const POST = instance.post
export const GET = instance.get;
