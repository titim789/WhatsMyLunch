import axios from "axios";
import { SERVER_DOMAIN } from "./config";

const USER_ENPOINT = `${SERVER_DOMAIN}/users`;
const USER_LOGIN_ENDPOINT = `${SERVER_DOMAIN}/login`;
const USER_REGISTER_ENDPOINT = `${SERVER_DOMAIN}/register`;
const USER_VERIFICATION_ENPOINT = `${SERVER_DOMAIN}/token`;
const USER_LOGOUT_ENPOINT = `${SERVER_DOMAIN}/logout`;

//Authentication
export const login = (payload) => axios.post(USER_LOGIN_ENDPOINT, payload);
export const register = (payload) =>
  axios.post(USER_REGISTER_ENDPOINT, payload);
export const verifyToken = () => axios.get(USER_VERIFICATION_ENPOINT);
export const logout = () => axios.delete(USER_LOGOUT_ENPOINT);
