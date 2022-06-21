import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'

import {BlockedUsers} from '../screens/MyPageStack'

type MyPageStackNavigatorParamList = {
  BlockedUsers: undefined
}

const Stack = createStackNavigator<MyPageStackNavigatorParamList>()

const MyPageStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: 'white'}}}>
      <Stack.Screen name="BlockedUsers" component={BlockedUsers} />
    </Stack.Navigator>
  )
}

export default MyPageStackNavigator
