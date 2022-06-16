import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Search, SearchContent} from '../screens/SearchStack'

const Stack = createStackNavigator()

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: 'white'}}}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="SearchContent" component={SearchContent} />
    </Stack.Navigator>
  )
}

export default SearchStackNavigator
