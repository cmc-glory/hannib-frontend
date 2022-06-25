import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import {GoodsDetail, GoodsRequestOffline, GoodsReqeustOnline, WriteQnA, QnAList, WriterProfile} from '../screens/GoodsStack'

type GoodsStackNavigatorParamList = {
  GoodsDetail: {
    sharingid: string
  }
  GoodsRequestOffline: undefined
  GoodsRequestOnline: undefined
  QnAList: {
    id: string
  }
  WriteQnA: {
    postid: string
    userid: string
    imageuri: string
    category: string
    title: string
  }
  WriterProfile: {
    writreid: string
  }
}

const Stack = createStackNavigator<GoodsStackNavigatorParamList>()

type GoodsDetailProps = NativeStackScreenProps<GoodsStackNavigatorParamList, 'GoodsDetail'>
export type GoodsDetailRouteProps = GoodsDetailProps['route']

type QnAListProps = NativeStackScreenProps<GoodsStackNavigatorParamList, 'QnAList'>
export type QnAListRouteProps = QnAListProps['route']

type WriteQnAProps = NativeStackScreenProps<GoodsStackNavigatorParamList, 'WriteQnA'>
export type WriteQnARouteProps = WriteQnAProps['route']

type WriterProfileProps = NativeStackScreenProps<GoodsStackNavigatorParamList, 'WriterProfile'>
export type WriterProfileRouteProps = WriterProfileProps['route']

const GoodsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: 'white'}}}>
      <Stack.Screen name="GoodsDetail" component={GoodsDetail} />
      <Stack.Screen name="GoodsRequestOffline" component={GoodsRequestOffline} />
      <Stack.Screen name="GoodsRequestOnline" component={GoodsReqeustOnline} />
      <Stack.Screen name="QnAList" component={QnAList} />
      <Stack.Screen name="WriteQnA" component={WriteQnA} />
      <Stack.Screen name="WriterProfile" component={WriterProfile} />
    </Stack.Navigator>
  )
}

export default GoodsStackNavigator
