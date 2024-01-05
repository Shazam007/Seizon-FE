import axios from "axios";

export const APIManager = axios.create({
  baseURL: "http://54.91.18.230:8081/api",
  // baseURL: "http://192.168.56.1:8081/api", <- add localhost URL here for server running on localhost
  responseType: 'json',
  withCredentials: true
});
