import React from 'react';
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

function RenderPostList({
  screenTitle,
  posts,
  fetchMoreData,
  onPressPostHandler,
  isRefreshing,
  handleRefresh,
  hash,
}) {
  const renderItem = ({item}) => {
    const isFavorite = hash[item.id] ? true : false;
    console.log(hash);
    return (
      <View style={styles.post}>
        <Text>id: {item.id}</Text>
        <Text>name : {item.name}</Text>
        <Text>title : {item.title}</Text>
        <Text>url : {item.url}</Text>
        <Image source={{uri: item.thumbnailUrl}} style={styles.thumbnail} />
        <TouchableOpacity
          onPress={() => {
            onPressPostHandler(item);
          }}>
          <Text style={styles.favorite}>
            즐겨찾기{isFavorite ? '에 추가되었습니다.' : ' 추가하기'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <>
      <Text>{screenTitle}</Text>
      <FlatList
        data={posts}
        renderItem={renderItem}
        bounces={false}
        keyExtractor={item => item.id.toString()}
        onEndReached={fetchMoreData}
        onEndReachedThreshold={0}
        ListFooterComponent={() => {
          return <ActivityIndicator size="large" />;
        }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
    </>
  );
}

export default React.memo(RenderPostList);

const styles = StyleSheet.create({
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
