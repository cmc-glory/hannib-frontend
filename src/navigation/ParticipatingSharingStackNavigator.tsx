import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {ParticipatingSharingOnline} from '../screens/ParticipatingSharingStack'

const Stack = createStackNavigator()

const ParticipatingSharingStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: 'white'}}}>
      <Stack.Screen name="ParticipatingSharingOnline" component={ParticipatingSharingOnline} />
    </Stack.Navigator>
  )
}

export default ParticipatingSharingStackNavigator
