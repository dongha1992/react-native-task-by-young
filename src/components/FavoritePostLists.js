import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {removeFavorite, getData} from '../store/postsReducer';

import {useDispatch, useSelector} from 'react-redux';

function FavoritePostLists() {
  const {favoritePosts} = useSelector(state => state.posts);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getStorageData();
  }, [favoritePosts]);

  const getStorageData = async () => {
    const result = await getData('favorite');
    if (result !== null) {
      setPosts(result);
    }
  };

  const onPressHandler = item => {
    dispatch(removeFavorite(item));
  };

  const renderItem = ({item}) => {
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
              onPressHandler(item);
            }}>
            즐겨찾기에서 삭제하기
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>즐겨찾기 리스트</Text>
      <FlatList
        data={posts}
        renderItem={renderItem}
        bounces={false}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
}
export default FavoritePostLists;
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
