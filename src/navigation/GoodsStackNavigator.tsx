import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import {
  NanumDetail,
  GoodsRequestOffline,
  GoodsReqeustOnline,
  WriteQnA,
  QnAListCreator,
  QnAListUser,
  WriterProfile,
  NoticeList,
  GoodsRequestComplete,
} from '../screens/GoodsStack'

type GoodsStackNavigatorParamList = {
  NanumDetail: {
    nanumIdx: string
  }
  GoodsRequestOffline: undefined
  GoodsRequestOnline: undefined
  QnAListUser: {
    nanumIdx: number
  }
  QnAListCreator: {
    nanumIdx: number
  }
  WriteQnA: {
    nanumIdx: number
    accountIdx: number
    imageuri: string
    category: string
    title: string
  }
  WriterProfile: {
    writreid: string
  }
  NoticeList: {
    postid: string
  }
  GoodsRequestComplete: undefined
}

const Stack = createStackNavigator<GoodsStackNavigatorParamList>()

type GoodsDetailProps = NativeStackScreenProps<GoodsStackNavigatorParamList, 'NanumDetail'>
export type GoodsDetailRouteProps = GoodsDetailProps['route']

type QnAListCreatorProps = NativeStackScreenProps<GoodsStackNavigatorParamList, 'QnAListCreator'>
export type QnAListCreatorRouteProps = QnAListCreatorProps['route']

type QnAListUserProps = NativeStackScreenProps<GoodsStackNavigatorParamList, 'QnAListUser'>
export type QnAListUserRouteProps = QnAListUserProps['route']

type WriteQnAProps = NativeStackScreenProps<GoodsStackNavigatorParamList, 'WriteQnA'>
export type WriteQnARouteProps = WriteQnAProps['route']

type WriterProfileProps = NativeStackScreenProps<GoodsStackNavigatorParamList, 'WriterProfile'>
export type WriterProfileRouteProps = WriterProfileProps['route']

const GoodsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: 'white', flex: 1}}}>
      <Stack.Screen name="NanumDetail" component={NanumDetail} />
      <Stack.Screen name="GoodsRequestOffline" component={GoodsRequestOffline} />
      <Stack.Screen name="GoodsRequestOnline" component={GoodsReqeustOnline} />
      <Stack.Screen name="QnAListUser" component={QnAListUser} />
      <Stack.Screen name="QnAListCreator" component={QnAListCreator} />
      <Stack.Screen name="WriteQnA" component={WriteQnA} />
      <Stack.Screen name="WriterProfile" component={WriterProfile} />
      <Stack.Screen name="NoticeList" component={NoticeList} />
      <Stack.Screen name="GoodsRequestComplete" component={GoodsRequestComplete} />
    </Stack.Navigator>
  )
}

export default GoodsStackNavigator
