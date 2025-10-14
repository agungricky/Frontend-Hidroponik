import axios from "axios";

const api = axios.create({
  baseURL: "https://ahc.adhikaryabrawijaya.my.id/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
