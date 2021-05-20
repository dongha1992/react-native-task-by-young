import React, {useState, useEffect} from 'react';
import {View, Image, TouchableOpacity, Text, SafeAreaView} from 'react-native';
import Network from '../libs/api';

function HomeScreen() {
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await Network.getAllPosts();
    console.log(data, 'd');
  };
  return (
    <SafeAreaView>
      <Text>홈</Text>
    </SafeAreaView>
  );
}
export default HomeScreen;
