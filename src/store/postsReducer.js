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
};

export const fetcherData = createAsyncThunk('post/setData', async payload => {
  return await Promise.all(
    ['users', 'posts', 'albums', 'photos'].map(endPoint => {
      try {
        return axios
          .get(`${BASE_URL}/${endPoint}?_limit=5&_page=${payload}}`)
          .then(res => res.data);
      } catch (error) {
        console.log(error);
      }
    }),
  );
});

export const setFavoritePostInLocalStorage = async lists => {
  try {
    const value = await JSON.stringify(lists);
    await AsyncStorage.setItem('favorite', value);
  } catch (e) {
    console.log(e);
    // saving error
  }
};

export const setHashedFavoritePostIdInLocalStorage = async lists => {
  try {
    const value = await JSON.stringify(lists);
    await AsyncStorage.setItem('hash', value);
  } catch (e) {
    console.log(e);
    // saving error
  }
};

// get local stroage item
export const getDataInLocalStorage = async key => {
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
    setFavoritePost: (state, action) => {
      state.favoritePosts.push({...action.payload, isFavorite: true});
      setFavoritePostInLocalStorage(state.favoritePosts);

      const hashed = state.favoritePosts.reduce((obj, cur) => {
        obj[cur.id] = cur;
        return obj;
      }, {});
      setHashedFavoritePostIdInLocalStorage(hashed);
      state.hashedFavoritedPosts = hashed;
    },

    removeFavoritePost: (state, action) => {
      const filtered = state.favoritePosts.filter(
        post => post.id !== action.payload.id,
      );
      state.favoritePosts = filtered;
      setFavoritePostInLocalStorage(filtered);
      delete state.hashedFavoritedPosts[action.payload.id];
      setHashedFavoritePostIdInLocalStorage(state.hashedFavoritedPosts);
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
        photos.forEach(photo => {
          if (post.albumId === photo.albumId) {
            post.thumbnailUrl = photo.thumbnailUrl;
            post.url = photo.url;
          }
        });
      });
      state.posts = [...state.posts, ...posts];
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

export const {getPosts, initPage, setFavoritePost, removeFavoritePost} =
  postsSlice.actions;
export default postsSlice.reducer;
