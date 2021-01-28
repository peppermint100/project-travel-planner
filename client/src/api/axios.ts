import axios from "axios";
import env from "./../configs/env"

export const basicAxios = axios.create({
  baseURL: env.ENDPOINT,
  headers: { 'Content-Type': 'application/json' },
  timeout: 1000,
});

export const tokenAxios = axios.create({
  baseURL: env.ENDPOINT,
  headers: { 
      'Content-Type': 'application/json',
      'Authorization': "MYJWT" 
    },
  timeout: 1000,
});