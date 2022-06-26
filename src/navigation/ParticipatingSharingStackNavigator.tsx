import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {ParticipatingSharingOnline, ParticipatingSharingOffline, WriteQnA} from '../screens/ParticipatingSharingStack'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'

type ParticipatingSharingStackNavigatorParamList = {
  ParticipatingSharingOnline: undefined
  ParticipatingSharingOffline: undefined
  WriteQnA: {
    postid: string
    userid: string
    imageuri: string
    category: string
    title: string
  }
}

const Stack = createStackNavigator<ParticipatingSharingStackNavigatorParamList>()

type WriteQnAProps = NativeStackScreenProps<ParticipatingSharingStackNavigatorParamList, 'WriteQnA'>
export type WriteQnARouteProps = WriteQnAProps['route']

const ParticipatingSharingStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: 'white'}}}>
      <Stack.Screen name="ParticipatingSharingOnline" component={ParticipatingSharingOnline} />
      <Stack.Screen name="ParticipatingSharingOffline" component={ParticipatingSharingOffline} />
      <Stack.Screen name="WriteQnA" component={WriteQnA} />
    </Stack.Navigator>
  )
}

export default ParticipatingSharingStackNavigator
