import React, {useEffect, useState, useCallback} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  fetcherData,
  removeFavorite,
  setFavorite,
  getData,
} from '../store/postsReducer';

import {useDispatch, useSelector} from 'react-redux';
import RenderPostList from './RenderPostList';

function PostLists() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hash, setHash] = useState({});
  const [page, setPage] = useState(2);

  const dispatch = useDispatch();
  const {posts, favoritePosts} = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetcherData());
    getHashedStorageItems();
  }, []);

  const fetchMoreData = useCallback(() => {
    setPage(page => page + 1);
    dispatch(fetcherData(page));
  }, [dispatch, page]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setPage(1);
    dispatch(fetcherData());
    setIsRefreshing(false);
  }, [dispatch]);

  const getHashedStorageItems = useCallback(async () => {
    const result = await getData('hash');
    if (result !== null) {
      setHash(result);
    }
  }, []);

  const onPressPostHandler = useCallback(
    item => {
      dispatch(setFavorite(item));
      return Alert.alert('즐겨찾기에 추가되었습니다.');
    },
    [dispatch],
  );

  console.log(posts);

  return (
    <SafeAreaView style={styles.container}>
      <RenderPostList
        screenTitle="포스트 리스트"
        posts={posts}
        onPressPostHandler={onPressPostHandler}
        handleRefresh={handleRefresh}
        fetchMoreData={fetchMoreData}
        hash={hash}
      />
    </SafeAreaView>
  );
}

export default React.memo(PostLists);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});
