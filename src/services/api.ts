import axios, { AxiosInstance } from "axios";
import { parseCookies } from "nookies";

function getAPIClient(): AxiosInstance {
  const { "customer-portal.token": token } = parseCookies();

  const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
  });

  if (token) {
    api.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  return api;
}

export const api = getAPIClient();
