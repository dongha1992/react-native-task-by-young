import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {removeFavoritePost, getDataInLocalStorage} from '../store/postsReducer';
import {useDispatch, useSelector} from 'react-redux';
import RenderPostList from './RenderPostList';

function FavoritePostLists() {
  const [posts, setPosts] = useState([]);

  const dispatch = useDispatch();
  const {favoritePosts} = useSelector(state => state.posts);

  useEffect(() => {
    getStorageData();
  }, [favoritePosts]);

  const getStorageData = useCallback(async () => {
    const result = await getDataInLocalStorage('favorite');
    if (result !== null) {
      setPosts(result);
    }
  }, []);

  const onPressPostHandler = useCallback(item => {
    dispatch(removeFavoritePost(item));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <RenderPostList
        screenTitle="즐겨찾기"
        posts={posts}
        onPressPostHandler={onPressPostHandler}
      />
    </SafeAreaView>
  );
}

export default React.memo(FavoritePostLists);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
});
