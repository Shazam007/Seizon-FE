import axios from "axios";

export const APIManager = axios.create({
  baseURL: "http://35.173.231.65:8081/api",
  // baseURL: "http://192.168.56.1:8082/api",
  responseType: 'json',
  withCredentials: true
});
