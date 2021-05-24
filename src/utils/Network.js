import axios from 'axios';
import {BASE_URL} from '../constants/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

// set local storage item
export const setData = async value => {
  try {
    const list = JSON.stringify(value);
    await AsyncStorage.setItem('favorite', list);
  } catch (e) {
    console.log(e);
    // saving error
  }
};

// get local stroage item
export const getata = async () => {
  try {
    const list = await AsyncStorage.getItem('favorite');
    return list !== null ? JSON.parse(list) : null;
  } catch (e) {
    console.log(e);
    // error reading value
  }
};

// get, delete
const _sendRequest = async (url, params, method) => {
  try {
    const res = await axios[method](BASE_URL + url, {params});

    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

// post, put
const _sendRequestForData = async (url, data, method) => {
  try {
    const res = await axios[method](BASE_URL + url, data);
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const _get = (url, params) => _sendRequest(url, params, 'get');

const _post = (url, data) => _sendRequestForData(url, data, 'post');

const _delete = (url, params) => _sendRequest(url, params, 'delete');

const _put = (url, data) => _sendRequestForData(url, data, 'put');

export const Network = {
  getAllPosts: () => _get(`${BASE_URL}/posts`),
  getAllUsers: () => _get(`${BASE_URL}/users`),
  getAllAlbums: () => _get(`${BASE_URL}/albums`),
};
