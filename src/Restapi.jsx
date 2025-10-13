import axios from "axios";

const api = axios.create({
  baseURL: "http://ahc.test/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
