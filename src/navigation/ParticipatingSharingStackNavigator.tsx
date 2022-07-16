import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {ParticipatingSharingOnline, ParticipatingSharingOffline, WriteQnA, WriteReview} from '../screens/ParticipatingSharingStack'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'

type ParticipatingSharingStackNavigatorParamList = {
  ParticipatingSharingOnline: {
    nanumIdx: number
  }
  ParticipatingSharingOffline: {
    nanumIdx: number
  }
  WriteQnA: {
    nanumIdx: number
    accountIdx: number
  }
  WriteReview: {
    nanumIdx: number
    accountIdx: number
    imageuri: string
    category: string
    title: string
  }
}

const Stack = createStackNavigator<ParticipatingSharingStackNavigatorParamList>()

type ParticipatingSharingOnlineProps = NativeStackScreenProps<ParticipatingSharingStackNavigatorParamList, 'ParticipatingSharingOnline'>
export type ParticipatingSharingOnlineRouteProps = ParticipatingSharingOnlineProps['route']
type ParticipatingSharingOfflineProps = NativeStackScreenProps<ParticipatingSharingStackNavigatorParamList, 'ParticipatingSharingOffline'>
export type ParticipatingSharingOfflineRouteProps = ParticipatingSharingOfflineProps['route']

type WriteQnAProps = NativeStackScreenProps<ParticipatingSharingStackNavigatorParamList, 'WriteQnA'>
export type WriteQnARouteProps = WriteQnAProps['route']

type WriteReviewProps = NativeStackScreenProps<ParticipatingSharingStackNavigatorParamList, 'WriteReview'>
export type WriteReviewPropsNavigationProps = WriteReviewProps['navigation']
export type WriteReviewPropsRouteProps = WriteReviewProps['route']

const ParticipatingSharingStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: 'white'}}}>
      <Stack.Screen name="ParticipatingSharingOnline" component={ParticipatingSharingOnline} />
      <Stack.Screen name="ParticipatingSharingOffline" component={ParticipatingSharingOffline} />
      <Stack.Screen name="WriteQnA" component={WriteQnA} />
      <Stack.Screen name="WriteReview" component={WriteReview} />
    </Stack.Navigator>
  )
}

export default ParticipatingSharingStackNavigator
