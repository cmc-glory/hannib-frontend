import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Login} from '../screens/LoginStack'

const Stack = createStackNavigator()

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  )
}

export default LoginStackNavigator
