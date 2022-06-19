import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {ParticipatingSharingOnline, ParticipatingSharingOffline} from '../screens/ParticipatingSharingStack'

const Stack = createStackNavigator()

const ParticipatingSharingStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: 'white'}}}>
      <Stack.Screen name="ParticipatingSharingOnline" component={ParticipatingSharingOnline} />
      <Stack.Screen name="ParticipatingSharingOffline" component={ParticipatingSharingOffline} />
    </Stack.Navigator>
  )
}

export default ParticipatingSharingStackNavigator
