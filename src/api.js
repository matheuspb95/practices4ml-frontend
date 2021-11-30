import axios from "axios";

const API_HOST = process.env.REACT_APP_API_HOST || "localhost";
const API_PORT = process.env.REACT_APP_API_PORT || "7000";
const baseURL = `http://${API_HOST}:${API_PORT}/`;
// const baseURL = `https://practices4ml-api.herokuapp.com`;

const api = axios.create({
  baseURL,
});

export default api ;
