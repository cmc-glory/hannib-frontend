import React from 'react'
import {View} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import GoodsList from '../screens/MainTab/GoodsList'

import GoodsStackNavigator from './GoodsStackNavigator'
import CommunityStackNavigator from './CommunityStackNavigator'
import ChattingStackNavigator from './ChattingStackNavigator'
import CalendarStackNavigator from './CalendarStackNavigator'
import MyPageStackNavigator from './MyPageStackNavigator'

import HomeOutlined from '../assets/icons/home_outlined.svg'
import HomeFilled from '../assets/icons/home_filled.svg'
import CommunityOutlined from '../assets/icons/community_outlined.svg'
import CommunityFilled from '../assets/icons/community_filled.svg'
import ChattingOutlined from '../assets/icons/chatting_outlined.svg'
import ChattingFilled from '../assets/icons/chatting_filled.svg'
import CalendarOutlined from '../assets/icons/calendar_outlined.svg'
import MyPageFilled from '../assets/icons/user_filled.svg'
import MyPageOutlined from '../assets/icons/user_outlined.svg'

const Tab = createBottomTabNavigator()

function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#000',
        headerShown: false,
      }}>
      <Tab.Screen
        name="GoodsList"
        options={{
          tabBarIcon: ({color, size, focused}) =>
            focused ? <HomeFilled fill={color} width={size} height={size} /> : <HomeOutlined fill={color} width={size} height={size} />,
        }}
        component={GoodsList}
      />
      <Tab.Screen
        name="CommunityStackNavigator"
        options={{
          tabBarIcon: ({color, size, focused}) =>
            focused ? <CommunityFilled fill={color} width={size} height={size} /> : <CommunityOutlined fill={color} width={size} height={size} />,
        }}
        component={CommunityStackNavigator}
      />
      <Tab.Screen
        name="ChattingStackNavigator"
        options={{
          tabBarIcon: ({color, size, focused}) =>
            focused ? <ChattingFilled fill={color} width={size} height={size} /> : <ChattingOutlined fill={color} width={size} height={size} />,
        }}
        component={ChattingStackNavigator}
      />
      <Tab.Screen
        name="CalendarStackNavigator"
        options={{
          tabBarIcon: ({color, size, focused}) => <CalendarOutlined fill={color} width={size} height={size}></CalendarOutlined>,
        }}
        component={CalendarStackNavigator}
      />
      <Tab.Screen
        name="MyPageStackNavigator"
        options={{
          tabBarIcon: ({color, size, focused}) =>
            focused ? <MyPageFilled fill={color} width={size} height={size} /> : <MyPageOutlined fill={color} width={size} height={size} />,
        }}
        component={MyPageStackNavigator}
      />
    </Tab.Navigator>
  )
}

export default BottomTab
