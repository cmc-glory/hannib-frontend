import React, {useMemo} from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import NanumList from '../screens/MainTab/NanumList'
import {getBottomSpace} from 'react-native-iphone-x-helper'
import CalendarStackNavigator from './CalendarStackNavigator'
import MyPageTabStackNavigator from './MyPageTabStackNavigator'
import {Favorites} from '../screens/MainTab/Favorites'

import {
  HomeIcon,
  HomeIconFocused,
  StarTabIcon,
  StarTabIconFocused,
  CalendarTabIcon,
  CalendarTabIconFocused,
  AccountIcon,
  AccountIconFocused,
} from '../components/utils'

import * as theme from '../theme'

const Tab = createBottomTabNavigator()

function BottomTab() {
  const bottomSpace = useMemo(() => getBottomSpace(), [])
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: theme.white,
      }}
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveTintColor: theme.main,
        tabBarInactiveTintColor: theme.gray500,
        headerShown: false,
        tabBarStyle: {
          borderTopColor: theme.gray500,
          height: 56 + bottomSpace,
        },
        tabBarLabelStyle: {
          lineHeight: 16,
          fontSize: 12,
        },
        tabBarIconStyle: {
          height: 24,
        },
        tabBarItemStyle: {
          marginTop: 4,
          marginBottom: 6,
        },
      }}>
      <Tab.Screen
        name="NanumList"
        options={{
          title: '리스트',
          tabBarIcon: ({focused}) => (focused ? <HomeIconFocused /> : <HomeIcon />),
        }}
        component={NanumList}
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
