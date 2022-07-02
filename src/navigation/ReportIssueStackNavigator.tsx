import React from 'react'
import {Platform} from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import {CardStyleInterpolators} from '@react-navigation/stack'
import {ReportIssueStep1, ReportIssueStep2, ReportIssueStep3} from '../screens/ReportIssueStack'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'

const Stack = createStackNavigator<ReportIssueStackNavigatorParamList>()
const ios = Platform.OS == 'ios'

type ReportIssueStackNavigatorParamList = {
  ReportIssueStep1: undefined
  ReportIssueStep2: {issue: string; reason?: string; userName: string}
  ReportIssueStep3: {issue: string; reason?: string; userName: string}
}

type Props2 = NativeStackScreenProps<ReportIssueStackNavigatorParamList, 'ReportIssueStep2'>
export type ReportIssueStep2NavigationProp = Props2['navigation']
export type ReportIssueStep2RouteProp = Props2['route']

type Props3 = NativeStackScreenProps<ReportIssueStackNavigatorParamList, 'ReportIssueStep3'>
export type ReportIssueStep3NavigationProp = Props3['navigation']
export type ReportIssueStep3RouteProp = Props3['route']

const ReportIssueStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: 'white'}, cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS}}>
      <Stack.Screen name="ReportIssueStep1" component={ReportIssueStep1} />
      <Stack.Screen name="ReportIssueStep2" component={ReportIssueStep2} />
      <Stack.Screen name="ReportIssueStep3" component={ReportIssueStep3} />
    </Stack.Navigator>
  )
}

export default ReportIssueStackNavigator
