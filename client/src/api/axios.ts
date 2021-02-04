import axios from "axios";
import env from "./../configs/env"

export const basicAxios = axios.create({
  baseURL: env.ENDPOINT,
  headers: { 'Content-Type': 'application/json' },
  // timeout: 1000,
});




