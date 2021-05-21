import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {GetUsers, GetPosts, GetPhotos} from '../services';
import Network from '../utils/Network';
import {BASE_URL} from '../constants/config';
import axios from 'axios';

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

export const fetcherData = createAsyncThunk('post/setData', async payload => {
  const LIMIT = 10;
  console.log('middleware');
  return await Promise.all(
    ['users', 'posts', 'albums', 'photos'].map(endPoint => {
      try {
        return axios
          .get(`${BASE_URL}/${endPoint}?_page=1&_limit=${LIMIT * payload}`)
          .then(res => res.data);
      } catch (error) {
        console.log(error);
      }
    }),
  );
});

const postsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: {
    [fetcherData.fulfilled]: (state, action) => {
      let [users, posts, albums, photos] = action.payload;
      posts.forEach(post => {
        users.forEach(user => {
          if (post.userId === user.id) {
            post.name = user.name;
          }
        });
        albums.forEach(album => {
          if (post.userId === album.id) {
            post.albumId = album.id;
          }
        });
        photos.forEach(photo => {
          if (post.albumId === photo.albumId) {
            post.thumbnailUrl = photo.thumbnailUrl;
            post.url = photo.url;
          }
        });
      });
      state.posts = posts;
      state.loading = true;
    },
    [fetcherData.pending]: (state, action) => {},
    [fetcherData.rejected]: (state, action) => {},
  },
});

export const {setData, setUsers} = postsSlice.actions;
export default postsSlice.reducer;
