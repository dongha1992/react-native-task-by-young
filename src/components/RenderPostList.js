import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';

function RenderPostList({
  screenTitle,
  posts,
  fetchMoreData,
  onPressPostHandler,
  isRefreshing,
  handleRefresh,
}) {
  const renderItem = ({item}) => {
    return (
      <View style={styles.post}>
        <Text>id: {item.id}</Text>
        <Text>name : {item.name}</Text>
        <Text>title : {item.title}</Text>
        <Text>url : {item.url}</Text>
        <Image source={{uri: item.thumbnailUrl}} style={styles.thumbnail} />
        <TouchableOpacity
          onPress={() => {
            if (screenTitle === '포스트 리스트' && item.isFavorite) return;
            onPressPostHandler(item);
          }}>
          <Text style={styles.favorite}>
            즐겨찾기{item.isFavorite ? '에 추가되었습니다.' : ' 추가하기'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{screenTitle}</Text>
      <FlatList
        data={posts}
        renderItem={renderItem}
        bounces={false}
        keyExtractor={item => item.id.toString()}
        onEndReached={fetchMoreData}
        onEndReachedThreshold={0}
        ListFooterComponent={() => {
          if (screenTitle === '즐겨찾기') return null;
          return <ActivityIndicator size="large" />;
        }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
}

export default React.memo(RenderPostList);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
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
