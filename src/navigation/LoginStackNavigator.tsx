import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import type {Asset} from 'react-native-image-picker'
import {Login, SelectCategory, AskAddStar, AskAddStarComplete, SetProfile} from '../screens/LoginStack'

type LoginStackNavigatorParamList = {
  Login: undefined
  SetProfile: {
    email: string
  }
  SelectCategory: {
    email: string
    name: string
    profileImage: Asset
  }
  AskAddStar: undefined
  AskAddStarComplete: undefined
}

const Stack = createStackNavigator<LoginStackNavigatorParamList>()

type SetProfileProps = NativeStackScreenProps<LoginStackNavigatorParamList, 'SetProfile'>
export type SetProfileRouteProps = SetProfileProps['route']

type SelectCategoryProps = NativeStackScreenProps<LoginStackNavigatorParamList, 'SelectCategory'>
export type SelectCategoryRouteProps = SelectCategoryProps['route']

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SetProfile" component={SetProfile} />
      <Stack.Screen name="SelectCategory" component={SelectCategory} />
      <Stack.Screen name="AskAddStar" component={AskAddStar} />
      <Stack.Screen name="AskAddStarComplete" component={AskAddStarComplete} />
    </Stack.Navigator>
  )
}

export default LoginStackNavigator
