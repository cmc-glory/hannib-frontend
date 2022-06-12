import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Login, SelectCategory} from '../screens/LoginStack'

const Stack = createStackNavigator()

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SelectCategory" component={SelectCategory} />
    </Stack.Navigator>
  )
}

export default LoginStackNavigator
