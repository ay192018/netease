import axios from "axios";
const http = axios.create({
  baseURL: "http://www.codeman.ink:3000",
  timeout: 5000,
  params: {
    cookie: localStorage.getItem("cookie"),
    withCredentials: true,
  },
});

http.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // console.log(config);
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
export default http;
