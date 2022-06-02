import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {GoodsDetail} from '../screens/GoodsStack'

const Stack = createStackNavigator()

const GoodsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: 'white'}}}>
      <Stack.Screen name="GoodsDetail" component={GoodsDetail} />
    </Stack.Navigator>
  )
}

export default GoodsStackNavigator
