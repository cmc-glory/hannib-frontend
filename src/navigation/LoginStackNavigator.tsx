import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Login, SelectCategory, AskAddStar} from '../screens/LoginStack'
import {AskAddStarComplete} from '../screens/LoginStack'

const Stack = createStackNavigator()

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SelectCategory" component={SelectCategory} />
      <Stack.Screen name="AskAddStar" component={AskAddStar} />
      <Stack.Screen name="AskAddStarComplete" component={AskAddStarComplete} />
    </Stack.Navigator>
  )
}

export default LoginStackNavigator
