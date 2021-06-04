import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, SafeAreaView, Alert} from 'react-native';
import {fetcherData, setFavoritePost} from '../store/postsReducer';

import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import RenderPostList from './RenderPostList';

function PostLists() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(2);

  const dispatch = useDispatch();
  const {posts} = useSelector(state => state.posts, shallowEqual);

  useEffect(() => {
    dispatch(fetcherData());
  }, [dispatch]);

  const fetchMoreData = useCallback(() => {
    setPage(page => page + 1);
    dispatch(fetcherData(page));
  }, [page]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setPage(1);
    dispatch(fetcherData());
    setIsRefreshing(false);
  }, [dispatch]);

  const onPressPostHandler = useCallback(
    item => {
      dispatch(setFavoritePost(item));
      return Alert.alert('즐겨찾기에 추가되었습니다.');
    },
    [dispatch],
  );

  return (
    <SafeAreaView style={styles.container}>
      <RenderPostList
        screenTitle="포스트 리스트"
        posts={posts}
        onPressPostHandler={onPressPostHandler}
        handleRefresh={handleRefresh}
        fetchMoreData={fetchMoreData}
        isRefreshing={isRefreshing}
      />
    </SafeAreaView>
  );
}

export default React.memo(PostLists);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
});
