import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'

import {BlockedUsers, EditProfile, Resign, CustomerService} from '../screens/MyPageStack'
import {EditCategory} from '../screens/RootStack'

type MyPageStackNavigatorParamList = {
  BlockedUsers: undefined
  EditProfile: undefined
  Resign: undefined
  CustomerService: undefined
  EditCategoryMyPage: undefined
}

const Stack = createStackNavigator<MyPageStackNavigatorParamList>()

const MyPageStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: 'white'}}}>
      <Stack.Screen name="BlockedUsers" component={BlockedUsers} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Resign" component={Resign} />
      <Stack.Screen name="CustomerService" component={CustomerService} />
      <Stack.Screen name="EditCategoryMyPage" component={EditCategory} />
    </Stack.Navigator>
  )
}

export default MyPageStackNavigator
