import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {WriteGoodsDefault, WriteGoodsOffline, WriteGoodsOnline, WriteGoodsComplete} from '../screens/WriteGoodsStack'

const Stack = createStackNavigator()

const WriteGoodsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="WriteGoodsDefault" component={WriteGoodsDefault} />
      <Stack.Screen name="WriteGoodsOffline" component={WriteGoodsOffline} />
      <Stack.Screen name="WriteGoodsOnline" component={WriteGoodsOnline} />
      <Stack.Screen name="WriteGoodsComplete" component={WriteGoodsComplete} />
    </Stack.Navigator>
  )
}

export default WriteGoodsStackNavigator
