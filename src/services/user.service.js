import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:3000/";

const getPublicContent = () => {
  return axios.get(API_URL + "admin/dashboard");
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin/dev-stuff", { headers: authHeader() });
};


export default {
  getPublicContent,
  getAdminBoard,
};  