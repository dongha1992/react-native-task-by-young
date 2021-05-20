import axios from 'axios';
import {BASE_URL} from '../constants/config';

export const Network = {
  getAllPosts: () => axios.get(`${BASE_URL}/posts`),
};
