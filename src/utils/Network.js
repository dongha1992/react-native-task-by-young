import axios from 'axios';
import {BASE_URL} from '../constants/config';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    return Promise.reject(error);
  },
);

export const Network = {
  getAllPosts: () => instance.get(`${BASE_URL}/posts`),
  getAllUsers: () => instance.get(`${BASE_URL}/users`),
  getAllAlbums: () => instance.get(`${BASE_URL}/albums`),
};
