import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
//import Login from '../screens/RootStack/Login'
import MainTabNavigator from './MainTabNavigator'
import WriteGoodsStackNavigator from './WriteGoodsStackNavigator'
//import FindId from '../screens/RootStack/FindId'
//import FindPassword from '../screens/RootStack/FindPassword'
//import CreateAccount from '../screens/RootStack/CreateAccount'
//import GoodsDetail from '../screens/GoodsStack/GoodsDetail'
import GoodsStackNavigator from './GoodsStackNavigator'
import LoginStackNavigator from './LoginStackNavigator'
import NotificationStackNavigator from './NotificationStackNavigator'
import SearchStackNavigator from './SearchStackNavigator'
import {SplashScreen} from '../screens/RootStack'
import HoldingSharingStackNavigator from './HoldingSharingStackNavigator'
import ParticipatingSharingStackNavigator from './ParticipatingSharingStackNavigator'
import ReportIssueStackNavigator from './ReportIssueStackNavigator'
import MyPageStackNavigator from './MyPageStackNavigator'

const Stack = createStackNavigator()

const RootStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: '#fff'}}} initialRouteName="SplashScreen">
      {/* <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="FindId" component={FindId} />
      <Stack.Screen name="FindPassword" component={FindPassword} />
      <Stack.Screen name="CreateAccount" options={{cardStyle: {backgroundColor: '#fff'}}} component={CreateAccount} /> */}
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="LoginStackNavigator" options={{gestureEnabled: false}} component={LoginStackNavigator} />
      <Stack.Screen name="MainTabNavigator" options={{gestureEnabled: false}} component={MainTabNavigator} />
      <Stack.Screen name="GoodsStackNavigator" component={GoodsStackNavigator}></Stack.Screen>
      <Stack.Screen name="WriteGoodsStackNavigator" component={WriteGoodsStackNavigator}></Stack.Screen>
      <Stack.Screen name="NotificationStackNavigator" component={NotificationStackNavigator}></Stack.Screen>
      <Stack.Screen name="SearchStackNavigator" component={SearchStackNavigator}></Stack.Screen>
      <Stack.Screen name="HoldingSharingStackNavigator" component={HoldingSharingStackNavigator}></Stack.Screen>
      <Stack.Screen name="ParticipatingSharingStackNavigator" component={ParticipatingSharingStackNavigator}></Stack.Screen>
      <Stack.Screen name="ReportIssueStackNavigator" component={ReportIssueStackNavigator}></Stack.Screen>
      <Stack.Screen name="MyPageStackNavigator" component={MyPageStackNavigator}></Stack.Screen>
    </Stack.Navigator>
  )
}

export default RootStackNavigator
