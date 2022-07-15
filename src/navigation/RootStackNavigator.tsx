import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {CardStyleInterpolators} from '@react-navigation/stack'

import MainTabNavigator from './MainTabNavigator'
import WriteNanumFormStackNavigator from './WriteNanumFormStackNavigator'
import GoodsStackNavigator from './GoodsStackNavigator'
import LoginStackNavigator from './LoginStackNavigator'
import NotificationStackNavigator from './NotificationStackNavigator'
import SearchStackNavigator from './SearchStackNavigator'
import {SplashScreen, EditCategory} from '../screens/RootStack'
import HoldingSharingStackNavigator from './HoldingSharingStackNavigator'
import ParticipatingSharingStackNavigator from './ParticipatingSharingStackNavigator'
import ReportIssueStackNavigator from './ReportIssueStackNavigator'
import MyPageStackNavigator from './MyPageStackNavigator'

const Stack = createStackNavigator()

const RootStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: '#fff'}}} initialRouteName="SplashScreen">
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginStackNavigator" component={LoginStackNavigator} />
      <Stack.Screen name="MainTabNavigator" options={{gestureEnabled: false}} component={MainTabNavigator} />
      <Stack.Screen name="GoodsStackNavigator" component={GoodsStackNavigator}></Stack.Screen>
      <Stack.Screen name="WriteNanumFormStackNavigator" component={WriteNanumFormStackNavigator}></Stack.Screen>
      <Stack.Screen name="NotificationStackNavigator" component={NotificationStackNavigator}></Stack.Screen>
      <Stack.Screen name="SearchStackNavigator" component={SearchStackNavigator}></Stack.Screen>
      <Stack.Screen name="HoldingSharingStackNavigator" component={HoldingSharingStackNavigator}></Stack.Screen>
      <Stack.Screen name="ParticipatingSharingStackNavigator" component={ParticipatingSharingStackNavigator}></Stack.Screen>
      <Stack.Screen name="ReportIssueStackNavigator" component={ReportIssueStackNavigator}></Stack.Screen>
      <Stack.Screen name="MyPageStackNavigator" component={MyPageStackNavigator}></Stack.Screen>
      <Stack.Screen
        name="EditCategory"
        component={EditCategory}
        options={{cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS, gestureDirection: 'vertical'}}
      />
    </Stack.Navigator>
  )
}

export default RootStackNavigator
