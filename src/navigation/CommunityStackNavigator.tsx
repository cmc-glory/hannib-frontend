import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Community} from '../screens/CommunityStack'

const Stack = createStackNavigator()

const CommunityStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Community" component={Community} />
    </Stack.Navigator>
  )
}

export default CommunityStackNavigator
