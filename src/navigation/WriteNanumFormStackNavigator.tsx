import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import {CardStyleInterpolators} from '@react-navigation/stack'

import {INanumMethod} from '../types'
import {WriteNanumFormDefault, WriteNanumFormOffline, WriteNanumFormOnline, WriteNanumFormComplete, SetCategoryNanumForm} from '../screens/WriteNanumFormStack'

type WriteNanumFormStackNavigatorParamList = {
  WriteNanumFormDefault: undefined
  WriteNanumFormOffline: {
    images: string[]
    category: {
      category: string
      job: '가수' | '배우'
    }
    title: string
    contents: string
    nanumMethod: INanumMethod
    firstDate: Date
  }
  WriteNanumFormOnline: {
    images: string[]
    category: {
      category: string
      job: '가수' | '배우'
    }
    title: string
    contents: string
    nanumMethod: INanumMethod
    isOpenDateBooked: boolean
    firstDate: Date
  }
  WriteNanumFormComplete: {
    nanumIdx: number
  }
  SetCategoryNanumForm: undefined
}

type WriteNanumFormOfflineProps = NativeStackScreenProps<WriteNanumFormStackNavigatorParamList, 'WriteNanumFormOffline'>
export type WriteNanumFormOfflineNavigationProps = WriteNanumFormOfflineProps['navigation']
export type WriteNanumFormOfflineRouteProps = WriteNanumFormOfflineProps['route']

type WriteNanumFormOnlineProps = NativeStackScreenProps<WriteNanumFormStackNavigatorParamList, 'WriteNanumFormOnline'>
export type WriteNanumFormOnlineNavigationProps = WriteNanumFormOnlineProps['navigation']
export type WriteNanumFormOnlineRouteProps = WriteNanumFormOnlineProps['route']

type WriteNanumFormCompleteProps = NativeStackScreenProps<WriteNanumFormStackNavigatorParamList, 'WriteNanumFormComplete'>
export type WriteNanumFormCompleteRouteProps = WriteNanumFormCompleteProps['route']

const Stack = createStackNavigator<WriteNanumFormStackNavigatorParamList>()

const WriteNanumFormStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="WriteNanumFormDefault" component={WriteNanumFormDefault} />
      <Stack.Screen name="WriteNanumFormOffline" component={WriteNanumFormOffline} />
      <Stack.Screen name="WriteNanumFormOnline" component={WriteNanumFormOnline} />
      <Stack.Screen name="WriteNanumFormComplete" component={WriteNanumFormComplete} />
      <Stack.Screen name="SetCategoryNanumForm" component={SetCategoryNanumForm} options={{cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}} />
    </Stack.Navigator>
  )
}

export default WriteNanumFormStackNavigator
