import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {PostLists} from '../components/index';

function HomeScreen() {
  return (
    <SafeAreaView>
      <PostLists />
    </SafeAreaView>
  );
}
export default HomeScreen;
