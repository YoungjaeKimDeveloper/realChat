import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:5011/api",
  // Send the cookie for every request
  withCredentials: true,
});
