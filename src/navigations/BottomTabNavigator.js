import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeScreen, FavoriteScreen} from '../screens';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const tabOptions = {
    style: {
      height: '7%',
    },
    labelStyle: {
      fontSize: 15,
      margin: 0,
      padding: 0,
    },
    activeTintColor: 'black',
    inactiveTintColor: 'gray',
  };
  return (
    <Tab.Navigator tabBarOptions={tabOptions}>
      <Tab.Screen name="홈" component={HomeScreen} />
      <Tab.Screen name="즐겨찾기" component={FavoriteScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
