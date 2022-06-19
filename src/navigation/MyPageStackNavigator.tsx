import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {MyPage, HoldingSharing} from '../screens/MyPageStack'

const Stack = createStackNavigator()

const MyPageStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: 'white'}}}>
      <Stack.Screen name="MyPage" component={MyPage} />
      <Stack.Screen name="HoldingSharing" component={HoldingSharing} />
    </Stack.Navigator>
  )
}

export default MyPageStackNavigator
