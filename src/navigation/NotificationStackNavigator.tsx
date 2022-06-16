import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {NotificationList, NotificationContent} from '../screens/NotificationStack'

const Stack = createStackNavigator()

const NotificationStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: 'white'}}}>
      <Stack.Screen name="NotificationList" component={NotificationList} />
      <Stack.Screen name="NotificationContent" component={NotificationContent} />
    </Stack.Navigator>
  )
}

export default NotificationStackNavigator
