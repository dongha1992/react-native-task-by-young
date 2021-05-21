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
} from 'react-native';
import {fetcherData} from '../store/postsReducer';
import {useDispatch, useSelector} from 'react-redux';

function PostLists() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const {posts, loading} = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetcherData(page));
  }, [dispatch, page]);

  const fetchMoreData = () => {
    setPage(prev => prev + 1);
    dispatch(fetcherData(page));
  };

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setPage(1);
    dispatch(fetcherData(page));
    setIsRefreshing(false);
  }, [dispatch, page]);

  const renderItem = ({item}) => {
    return (
      <View style={styles.post}>
        <Text>{item.name}</Text>
        <Text>{item.title}</Text>
        <Text>{item.url}</Text>
        <Image source={{uri: item.thumbnailUrl}} style={styles.thumbnail} />
      </View>
    );
  };

  if (!posts.length) {
    return (
      <View style={styles.Loading}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text>포스트 리스트</Text>
      <FlatList
        data={posts}
        renderItem={renderItem}
        bounces={false}
        keyExtractor={item => item.id.toString()}
        onEndReached={fetchMoreData}
        onEndReachedThreshold={0.5}
        renderFooter={() => {
          if (!loading) null;
          return <ActivityIndicator />;
        }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
    </SafeAreaView>
  );
}

export default PostLists;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  post: {
    height: 100,
    marginBottom: 90,
  },
  thumbnail: {
    height: '100%',
    width: '100%',
  },
  Loading: {
    width: '100%',
    height: '100%',
  },
});
