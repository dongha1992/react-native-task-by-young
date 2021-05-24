import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL} from '../constants/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  posts: [],
  paginatedPosts: [],
  favoritePosts: [],
  hashedFavoritedPosts: {},
  loading: false,
  error: null,
  limit: 10,
  page: 1,
};

export const fetcherData = createAsyncThunk('post/setData', async payload => {
  return await Promise.all(
    ['users', 'posts', 'albums', 'photos'].map(endPoint => {
      try {
        return axios.get(`${BASE_URL}/${endPoint}`).then(res => res.data);
      } catch (error) {
        console.log(error);
      }
    }),
  );
});

export const setData = async lists => {
  try {
    const value = await JSON.stringify(lists);
    await AsyncStorage.setItem('favorite', value);
  } catch (e) {
    console.log(e);
    // saving error
  }
};

export const setHashItems = async lists => {
  try {
    const value = await JSON.stringify(lists);
    await AsyncStorage.setItem('hash', value);
  } catch (e) {
    console.log(e);
    // saving error
  }
};

// get local stroage item
export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  } catch (e) {
    console.log(e);
    // error reading value
  }
};

const postsSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.page = state.page + 1;
      state.paginatedPosts = state.posts.slice(0, state.limit * state.page);
    },
    initPage: (state, action) => {
      state.page = 1;
    },
    setFavorite: (state, action) => {
      state.favoritePosts.push(action.payload);
      setData(state.favoritePosts);
      const hashed = state.favoritePosts.reduce((obj, cur) => {
        obj[cur.id] = cur;
        return obj;
      }, {});
      setHashItems(hashed);
      state.hashedFavoritedPosts = hashed;
    },
    removeFavorite: (state, action) => {
      const filtered = state.favoritePosts.filter(
        post => post.id !== action.payload.id,
      );
      state.favoritePosts = filtered;
      setData(filtered);
      delete state.hashedFavoritedPosts[action.payload.id];
      setHashItems(state.hashedFavoritedPosts);
    },
  },
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
        photos.slice(0, 500).forEach(photo => {
          if (post.albumId === photo.albumId) {
            post.thumbnailUrl = photo.thumbnailUrl;
            post.url = photo.url;
          }
        });
      });
      state.posts = posts;
      state.paginatedPosts = posts.slice(0, state.limit);
      state.loading = false;
    },
    [fetcherData.pending]: (state, action) => {
      state.loading = true;
    },
    [fetcherData.rejected]: (state, action) => {
      state.loading = true;
    },
  },
});

export const {getPosts, initPage, setFavorite, removeFavorite} =
  postsSlice.actions;
export default postsSlice.reducer;
