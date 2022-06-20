import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {ReportIssueStep1, ReportIssueStep2, ReportIssueStep3} from '../screens/ReportIssueStack'
const Stack = createStackNavigator()

const ReportIssueStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: 'white'}}}>
      <Stack.Screen name="ReportIssueStep1" component={ReportIssueStep1} />
      <Stack.Screen name="ReportIssueStep2" component={ReportIssueStep2} />
      <Stack.Screen name="ReportIssueStep3" component={ReportIssueStep3} />
    </Stack.Navigator>
  )
}

export default ReportIssueStackNavigator
