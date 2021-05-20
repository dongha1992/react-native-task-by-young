import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';

const MainStack = createStackNavigator();

const screenOptions = {
  headerShown: false,
};

function StackNavigator() {
  return (
    <MainStack.Navigator screenOptions={screenOptions}>
      <MainStack.Screen
        name="bottomTabNavigator"
        component={BottomTabNavigator}
      />
    </MainStack.Navigator>
  );
}

export default StackNavigator;
