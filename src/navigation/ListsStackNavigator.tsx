import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Lists, ListDetail} from '../screens/ListsStack'

const Stack = createStackNavigator()

const ListsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: 'white'}}}>
      <Stack.Screen name="Lists" component={Lists} />
      <Stack.Screen name="ListDetail" component={ListDetail} />
    </Stack.Navigator>
  )
}

export default ListsStackNavigator
