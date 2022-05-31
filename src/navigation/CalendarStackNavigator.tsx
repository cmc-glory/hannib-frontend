import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Calendar} from '../screens/CalendarStack'

const Stack = createStackNavigator()

const CalendarStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen name="Calendar" component={Calendar} />
    </Stack.Navigator>
  )
}

export default CalendarStackNavigator
