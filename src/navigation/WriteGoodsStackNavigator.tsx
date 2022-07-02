import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import type {Asset} from 'react-native-image-picker'
import {ISharingType} from '../types'
import {WriteGoodsDefault, WriteGoodsOffline, WriteGoodsOnline, WriteGoodsComplete} from '../screens/WriteGoodsStack'

type WriteGoodsStackNavigatorParamList = {
  WriteGoodsDefault: undefined
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

type WriteGoodsOfflineProps = NativeStackScreenProps<WriteGoodsStackNavigatorParamList, 'WriteGoodsOffline'>
export type WriteGoodsOfflineNavigationProps = WriteGoodsOfflineProps['navigation']
export type WriteGoodsOfflineRouteProps = WriteGoodsOfflineProps['route']

type WriteGoodsOnlineProps = NativeStackScreenProps<WriteGoodsStackNavigatorParamList, 'WriteGoodsOnline'>
export type WriteGoodsOnlineNavigationProps = WriteGoodsOnlineProps['navigation']
export type WriteGoodsOnlineRouteProps = WriteGoodsOnlineProps['route']

const Stack = createStackNavigator<WriteGoodsStackNavigatorParamList>()

const WriteGoodsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="WriteGoodsDefault" component={WriteGoodsDefault} />
      <Stack.Screen name="WriteGoodsOffline" component={WriteGoodsOffline} />
      <Stack.Screen name="WriteGoodsOnline" component={WriteGoodsOnline} />
      <Stack.Screen name="WriteGoodsComplete" component={WriteGoodsComplete} />
    </Stack.Navigator>
  )
}

export default WriteGoodsStackNavigator
