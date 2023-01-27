import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://5d9f7fe94d823c0014dd323d.mockapi.io/api/",
  headers: {
    "Content-type": "application/json",
  },
});

export default apiClient;
