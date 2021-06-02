import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import {removeFavorite, getData} from '../store/postsReducer';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import RenderPostList from './RenderPostList';

function FavoritePostLists() {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getStorageData();
  }, []);

  const getStorageData = useCallback(async () => {
    const result = await getData('favorite');
    if (result !== null) {
      setPosts(result);
    }
  }, []);

  const onPressPostHandler = useCallback(item => {
    dispatch(removeFavorite(item));
  }, []);

  console.log('render favorite lists');

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
