import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {HoldingSharing, SendNotice, EditGoodsDefault} from '../screens/HoldingSharingStack'

const Stack = createStackNavigator()

const HoldingSharingStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: 'white'}}}>
      <Stack.Screen name="HoldingSharing" component={HoldingSharing} />
      {/* <Stack.Screen name="HoldingSharingDetail" component={HoldingSharingDetail} /> */}
      <Stack.Screen name="SendNotice" component={SendNotice} />
      <Stack.Screen name="EditGoodsDefault" component={EditGoodsDefault} />
    </Stack.Navigator>
  )
}

export default HoldingSharingStackNavigator
