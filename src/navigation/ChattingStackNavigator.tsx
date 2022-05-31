import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Chatting} from '../screens/ChattingStack'

const Stack = createStackNavigator()

const ChattingStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen name="Chatting" component={Chatting} />
    </Stack.Navigator>
  )
}

export default ChattingStackNavigator
