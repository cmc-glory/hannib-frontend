import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import type {NativeStackScreenProps} from '@react-navigation/native-stack'
import {Search, SearchDetail} from '../screens/SearchStack'

type SearchStackNavigatorParamList = {
  Search: undefined
  SearchDetail: {
    keyword: string
  }
}

type SearchDetailProps = NativeStackScreenProps<SearchStackNavigatorParamList, 'SearchDetail'>
export type SearchDetailRouteProps = SearchDetailProps['route']

const Stack = createStackNavigator<SearchStackNavigatorParamList>()

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: {backgroundColor: 'white'}}}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="SearchDetail" component={SearchDetail} />
    </Stack.Navigator>
  )
}

export default SearchStackNavigator
