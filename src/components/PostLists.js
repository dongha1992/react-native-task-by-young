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
import {fetcherData, getPosts, initPage} from '../store/postsReducer';
import {useDispatch, useSelector} from 'react-redux';

function PostLists() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();
  const {loading, paginatedPosts} = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetcherData());
  }, []);

  const fetchMoreData = () => {
    dispatch(getPosts());
  };

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    dispatch(fetcherData());
    dispatch(initPage());
    setIsRefreshing(false);
  }, [dispatch]);

  const renderItem = ({item}) => {
    return (
      <View style={styles.post}>
        <Text>name : {item.name}</Text>
        <Text>title : {item.title}</Text>
        <Text>url : {item.url}</Text>
        <Image source={{uri: item.thumbnailUrl}} style={styles.thumbnail} />
      </View>
    );
  };
  if (loading) {
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
        data={paginatedPosts}
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
