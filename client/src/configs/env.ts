import dotenv from "dotenv";

export default {
    ENDPOINT: process.env.REACT_APP_ENDPOINT || "http://localhost:8080",
    CLIENT: process.env.REACT_APP_CLIENT || "http://localhost:3000",
    GOOGLE_API_KEY: process.env.REACT_APP_GOOGLE_API_KEY 
}