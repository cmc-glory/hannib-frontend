import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import type {Asset} from 'react-native-image-picker'
import {ISharingType} from '../types'
import {WriteNanumFormDefault, WriteGoodsOffline, WriteGoodsOnline, WriteGoodsComplete} from '../screens/WriteNanumFormStack'

type WriteNanumFormStackNavigatorParamList = {
  WriteNanumFormDefault: undefined
  WriteGoodsOffline: {
    images: Asset[]
    categories: string[]
    title: string
    content: string
    type: ISharingType
    isOpenDateBooked: boolean
    openDate?: Date | undefined
  }
  WriteGoodsOnline: {
    images: Asset[]
    categories: string[]
    title: string
    content: string
    type: ISharingType
    isOpenDateBooked: boolean
    openDate?: Date | undefined
  }
  WriteGoodsComplete: {
    id: string
  }
}

type WriteGoodsOfflineProps = NativeStackScreenProps<WriteNanumFormStackNavigatorParamList, 'WriteGoodsOffline'>
export type WriteGoodsOfflineNavigationProps = WriteGoodsOfflineProps['navigation']
export type WriteGoodsOfflineRouteProps = WriteGoodsOfflineProps['route']

type WriteGoodsOnlineProps = NativeStackScreenProps<WriteNanumFormStackNavigatorParamList, 'WriteGoodsOnline'>
export type WriteGoodsOnlineNavigationProps = WriteGoodsOnlineProps['navigation']
export type WriteGoodsOnlineRouteProps = WriteGoodsOnlineProps['route']

const Stack = createStackNavigator<WriteNanumFormStackNavigatorParamList>()

const WriteNanumFormStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="WriteNanumFormDefault" component={WriteNanumFormDefault} />
      <Stack.Screen name="WriteGoodsOffline" component={WriteGoodsOffline} />
      <Stack.Screen name="WriteGoodsOnline" component={WriteGoodsOnline} />
      <Stack.Screen name="WriteGoodsComplete" component={WriteGoodsComplete} />
    </Stack.Navigator>
  )
}

export default WriteNanumFormStackNavigator
