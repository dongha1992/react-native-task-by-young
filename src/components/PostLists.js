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
  getPosts,
  initPage,
  setFavorite,
  getData,
} from '../store/postsReducer';

import {useDispatch, useSelector} from 'react-redux';

function PostLists() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hash, setHash] = useState({});
  const dispatch = useDispatch();
  const {loading, paginatedPosts, favoritePosts} = useSelector(
    state => state.posts,
  );

  useEffect(() => {
    dispatch(fetcherData());
    getHashedStorageItems();
  }, [favoritePosts, dispatch]);

  const fetchMoreData = () => {
    dispatch(getPosts());
  };

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    dispatch(fetcherData());
    dispatch(initPage());
    setIsRefreshing(false);
  }, [dispatch]);

  const onPressHandler = item => {
    dispatch(setFavorite(item));
    Alert.alert('즐겨찾기에 추가되었습니다.');
  };

  const getHashedStorageItems = async () => {
    const result = await getData('hash');
    if (result !== null) {
      setHash(result);
    }
  };
  const renderItem = ({item}) => {
    const isFavorite = hash[item.id] ? true : false;

    return (
      <View style={styles.post}>
        <Text>id: {item.id}</Text>
        <Text>name : {item.name}</Text>
        <Text>title : {item.title}</Text>
        <Text>url : {item.url}</Text>
        <Image source={{uri: item.thumbnailUrl}} style={styles.thumbnail} />
        <TouchableOpacity>
          <Text
            style={styles.favorite}
            onPress={() => {
              if (isFavorite) return;
              onPressHandler(item);
            }}>
            즐겨찾기{isFavorite ? '에 추가되었습니다.' : ' 추가하기'}
          </Text>
        </TouchableOpacity>
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
    marginBottom: 130,
  },
  thumbnail: {
    height: '100%',
    width: '100%',
  },
  Loading: {
    width: '100%',
    height: '100%',
  },
  favorite: {
    fontSize: 20,
  },
});
