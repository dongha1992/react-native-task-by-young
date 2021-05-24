import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {removeFavorite} from '../store/postsReducer';
import {useDispatch, useSelector} from 'react-redux';

function FavoritePostLists() {
  const {favoritePosts} = useSelector(state => state.posts);
  const dispatch = useDispatch();

  const onPressHandler = item => {
    dispatch(removeFavorite(item));
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.post}>
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
        data={favoritePosts}
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
    marginBottom: 110,
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
