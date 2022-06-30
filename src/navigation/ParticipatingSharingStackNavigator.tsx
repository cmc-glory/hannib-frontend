import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {ParticipatingSharingOnline, ParticipatingSharingOffline, WriteQnA, WriteReview} from '../screens/ParticipatingSharingStack'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import {Asset} from 'react-native-image-picker'

type ParticipatingSharingStackNavigatorParamList = {
  ParticipatingSharingOnline: undefined
  ParticipatingSharingOffline: undefined
  WriteQnA: {
    userid: string
    imageuri: string
    category: string
    title: string
  }
  WriteReview: {
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
