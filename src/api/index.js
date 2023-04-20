import axios from "axios";
import { SERVER_DOMAIN } from "./config";

// const USER_ENPOINT = `${SERVER_DOMAIN}/users`;
const USER_LOGIN_ENDPOINT = `${SERVER_DOMAIN}/login`;
const USER_REGISTER_ENDPOINT = `${SERVER_DOMAIN}/users`;
const USER_VERIFICATION_ENPOINT = `${SERVER_DOMAIN}/token`;
const USER_LOGOUT_ENPOINT = `${SERVER_DOMAIN}/logout`;
const USER_FORGET_PASSWORD_ENDPOINT = `${SERVER_DOMAIN}/forgetpassword`;
const USER_FORGET_PASSWORD_AUTH_ENDPOINT = `${SERVER_DOMAIN}/forgetpasswordauth`;

const USERS_TASTE_PALETTE_ENDPOINT = `${SERVER_DOMAIN}/userstastepalette`;
const USERS_TOP_FOOD_CHOICE_ENDPOINT = `${SERVER_DOMAIN}/userstopfoodchoice`;
const WML_ENDPOINT = `${SERVER_DOMAIN}/wml`;
const SURPRISE_ME_ENDPOINT = `${SERVER_DOMAIN}/surprise`;
const FOOD_DATASET_ENDPOINT = `${SERVER_DOMAIN}/fooddataset`;
const GOOGLE_NEARBY_FOOD_ENDPOINT = `${SERVER_DOMAIN}/getnearbyfood`;

//Authentication
export const login = (payload) => axios.post(USER_LOGIN_ENDPOINT, payload);
export const register = (payload) =>
  axios.post(USER_REGISTER_ENDPOINT, payload);
export const verifyToken = (token) =>
  axios.get(USER_VERIFICATION_ENPOINT, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const logout = () => axios.delete(USER_LOGOUT_ENPOINT);
export const forgetpassword = (payload) =>
  axios.post(USER_FORGET_PASSWORD_ENDPOINT, payload);
export const forgetpasswordauth = (payload) =>
  axios.post(USER_FORGET_PASSWORD_AUTH_ENDPOINT, payload);

//User's Food Choice
export const getUserTopFoodChoice = () =>
  axios.get(USERS_TOP_FOOD_CHOICE_ENDPOINT, { withCredentials: true });

export const setUserTopFoodChoice = (payload) =>
  axios.post(USERS_TOP_FOOD_CHOICE_ENDPOINT, payload, {
    withCredentials: true,
  });

//WML
export const getWml = () => axios.get(WML_ENDPOINT, { withCredentials: true });

//Surprise Me
export const getSurpriseMe = () =>
  axios.get(SURPRISE_ME_ENDPOINT, { withCredentials: true });

//Food dataset
export const getFoodDataset = () =>
  axios.get(FOOD_DATASET_ENDPOINT, { withCredentials: true });

export const getFoodDatasetByIds = (payload) =>
  axios.get(FOOD_DATASET_ENDPOINT, payload, { withCredentials: true });

//Users palette
export const getUsersTastePalette = () =>
  axios.get(USERS_TASTE_PALETTE_ENDPOINT, { withCredentials: true });

//Google API
export const getGoogleNearbyFood = async (payload) =>
  await axios.post(GOOGLE_NEARBY_FOOD_ENDPOINT, payload, {
    withCredentials: true,
  });
