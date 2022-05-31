import React, {useState, useRef, useEffect} from 'react'
import {Dimensions, Text, StyleSheet} from 'react-native'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import ListDetailDescription from '../screens/ListsStack/ListDetailTab/ListDetailDescription'
import ListDetailNotice from '../screens/ListsStack/ListDetailTab/ListDetailNotice'

const Tab = createMaterialTopTabNavigator()

const ListDetailTabNavigator = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{backgroundColor: '#fff'}}
      screenOptions={{
        tabBarLabelStyle: {fontSize: 12},
        tabBarIndicatorStyle: {
          width: 80,
          height: 3,
          marginLeft: Dimensions.get('window').width / 4 - 50,
          borderRadius: 3,
          backgroundColor: '#000',
        },
        tabBarInactiveTintColor: '#000',
      }}>
      <Tab.Screen
        name="ListDetailDescription"
        options={{
          tabBarLabel: ({focused, color}) => {
            return <Text style={[{fontWeight: '600', color: color}]}>나눔 설명</Text>
          },
        }}
        component={ListDetailDescription}
      />
      <Tab.Screen
        name="ListDetailNotice"
        options={{
          tabBarLabel: ({focused, color}) => {
            return <Text style={[{fontWeight: '600', color: color}]}>공지</Text>
          },
        }}
        component={ListDetailNotice}
      />
    </Tab.Navigator>
  )
}
export default ListDetailTabNavigator
