import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {ReportIssueStep1} from '../screens/ReportIssueStack'
const Stack = createStackNavigator()

const ReportIssueStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: 'white'}}}>
      <Stack.Screen name="ReportIssueStep1" component={ReportIssueStep1} />
    </Stack.Navigator>
  )
}

export default ReportIssueStackNavigator
