import React from 'react'
import {View, Text, StyleSheet, Platform} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import GoodsList from '../screens/MainTab/GoodsList'

import CommunityStackNavigator from './CommunityStackNavigator'
import ChattingStackNavigator from './ChattingStackNavigator'
import CalendarStackNavigator from './CalendarStackNavigator'
import MyPageTabStackNavigator from './MyPageTabStackNavigator'
import {Favorites} from '../screens/MainTab/Favorites'
//import MyPageStackNavigator from './MyPageStackNavigator'

import {
  HomeIcon,
  HomeIconFocused,
  StarTabIcon,
  StarTabIconFocused,
  CommunityIcon,
  CommunityIconFocused,
  ChattingIcon,
  ChattingIconFocused,
  CalendarTabIcon,
  CalendarTabIconFocused,
  AccountIcon,
  AccountIconFocused,
} from '../components/utils'

import * as theme from '../theme'

const Tab = createBottomTabNavigator()

function BottomTab() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: theme.white,
      }}
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: theme.main,
        tabBarInactiveTintColor: theme.gray800,
        headerShown: false,
        tabBarStyle: {
          //borderTopWidth: 0,
          //borderColor: '#fff',
          borderTopColor: theme.gray500,
          //height: Platform.OS == 'android' ? 60 : 80,
        },
        tabBarItemStyle: {
          marginTop: 5,
          marginBottom: Platform.OS == 'android' ? 5 : 0,
        },
      }}>
      <Tab.Screen
        name="GoodsList"
        options={{
          title: '리스트',
          tabBarIcon: ({focused}) => (focused ? <HomeIconFocused /> : <HomeIcon />),
        }}
        component={GoodsList}
      />
      <Tab.Screen
        name="Favorites"
        options={{
          title: '찜',
          tabBarIcon: ({focused}) => (focused ? <StarTabIconFocused /> : <StarTabIcon />),
        }}
        component={Favorites}
      />
      <Tab.Screen
        name="CalendarStackNavigator"
        options={{
          title: '일정',
          tabBarIcon: ({focused}) => (focused ? <CalendarTabIconFocused /> : <CalendarTabIcon />),
        }}
        component={CalendarStackNavigator}
      />
      <Tab.Screen
        name="MyPageTabStackNavigator"
        options={{
          title: 'MY',
          tabBarIcon: ({focused}) => (focused ? <AccountIconFocused /> : <AccountIcon />),
        }}
        component={MyPageTabStackNavigator}
      />
    </Tab.Navigator>
  )
}

export default BottomTab
