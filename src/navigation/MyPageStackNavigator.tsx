import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {MyPage} from '../screens/MyPageStack'

const Stack = createStackNavigator()

const MyPageStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MyPage" component={MyPage} />
    </Stack.Navigator>
  )
}

export default MyPageStackNavigator
