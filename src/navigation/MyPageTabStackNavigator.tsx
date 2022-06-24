import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'

import {MyPage, HoldingSharingList, ParticipatingSharingList} from '../screens/MyPageTabStack'

type MyPageTabStackNavigatorParamList = {
  MyPage: undefined
  HoldingSharingList: undefined
  ParticipatingSharingList: undefined
}

const Stack = createStackNavigator<MyPageTabStackNavigatorParamList>()

const MyPageTabStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: 'white'}}}>
      <Stack.Screen name="MyPage" component={MyPage} />
      <Stack.Screen name="HoldingSharingList" component={HoldingSharingList} />
      <Stack.Screen name="ParticipatingSharingList" component={ParticipatingSharingList} />
    </Stack.Navigator>
  )
}

export default MyPageTabStackNavigator
