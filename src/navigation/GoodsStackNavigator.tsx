import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import {GoodsDetail, GoodsRequestOffline, GoodsReqeustOnline, WriteQnA, QnAList} from '../screens/GoodsStack'

type GoodsStackNavigatorParamList = {
  GoodsDetail: undefined
  GoodsRequestOffline: undefined
  GoodsRequestOnline: undefined
  QnAList: {
    id: string
  }
  WriteQnA: {
    postid: string
    userid: string
  }
}

const Stack = createStackNavigator<GoodsStackNavigatorParamList>()

type QnAListProps = NativeStackScreenProps<GoodsStackNavigatorParamList, 'QnAList'>
export type QnAListRouteProps = QnAListProps['route']

type WriteQnAProps = NativeStackScreenProps<GoodsStackNavigatorParamList, 'WriteQnA'>
export type WriteQnARouteProps = QnAListProps['route']

const GoodsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: 'white'}}}>
      <Stack.Screen name="GoodsDetail" component={GoodsDetail} />
      <Stack.Screen name="GoodsRequestOffline" component={GoodsRequestOffline} />
      <Stack.Screen name="GoodsRequestOnline" component={GoodsReqeustOnline} />
      <Stack.Screen name="QnAList" component={QnAList} />
      <Stack.Screen name="WriteQnA" component={WriteQnA} />
    </Stack.Navigator>
  )
}

export default GoodsStackNavigator
