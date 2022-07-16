import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'

import {HoldingSharing, SendNotice, EditGoodsDefault, EditGoodsOffline, EditGoodsOnline} from '../screens/HoldingSharingStack'

type HoldingSharingStackNavigatorParamList = {
  HoldingSharing: {
    nanumIdx: number
  }
  SendNotice: {
    nanumIdx: number
    accountIdxList: number[]
  }
  EditGoodsDefault: undefined
  EditGoodsOnline: undefined
  EditGoodsOffline: undefined
}

type HoldingSharingProps = NativeStackScreenProps<HoldingSharingStackNavigatorParamList, 'HoldingSharing'>
export type HoldingSharingNavigationProps = HoldingSharingProps['navigation']
export type HoldingSharingRouteProps = HoldingSharingProps['route']

type SendNoticeProps = NativeStackScreenProps<HoldingSharingStackNavigatorParamList, 'SendNotice'>
export type SendNoticeNavigationProps = SendNoticeProps['navigation']
export type SendNoticeRouteProps = SendNoticeProps['route']

const Stack = createStackNavigator<HoldingSharingStackNavigatorParamList>()

const HoldingSharingStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: 'white'}}}>
      <Stack.Screen name="HoldingSharing" component={HoldingSharing} />
      {/* <Stack.Screen name="HoldingSharingDetail" component={HoldingSharingDetail} /> */}
      <Stack.Screen name="SendNotice" component={SendNotice} />
      <Stack.Screen name="EditGoodsDefault" component={EditGoodsDefault} />
      <Stack.Screen name="EditGoodsOnline" component={EditGoodsOnline} />
      <Stack.Screen name="EditGoodsOffline" component={EditGoodsOffline} />
    </Stack.Navigator>
  )
}

export default HoldingSharingStackNavigator
