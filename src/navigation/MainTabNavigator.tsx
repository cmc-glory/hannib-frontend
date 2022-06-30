import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import GoodsList from '../screens/MainTab/GoodsList'
import {isIphoneX} from 'react-native-iphone-x-helper'
import CalendarStackNavigator from './CalendarStackNavigator'
import MyPageTabStackNavigator from './MyPageTabStackNavigator'
import {Favorites} from '../screens/MainTab/Favorites'

const iphoneX = isIphoneX()

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
          borderTopColor: theme.gray500,
          height: 56,
        },
        tabBarLabelStyle: {
          marginTop: 2,
        },
        tabBarItemStyle: {
          marginTop: 5,
          marginBottom: 8,
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
