import axios from 'axios';
import {BASE_URL} from '../constants/config';


// set local storage item

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
