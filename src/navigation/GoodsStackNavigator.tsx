import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {GoodsDetail, GoodsRequestOffline, GoodsReqeustOnline} from '../screens/GoodsStack'

const Stack = createStackNavigator()

const GoodsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: 'white'}}}>
      <Stack.Screen name="GoodsDetail" component={GoodsDetail} />
      <Stack.Screen name="GoodsRequestOffline" component={GoodsRequestOffline} />
      <Stack.Screen name="GoodsRequestOnline" component={GoodsReqeustOnline} />
    </Stack.Navigator>
  )
}

export default GoodsStackNavigator
