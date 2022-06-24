import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Login} from './Login'
import {MyPageScreen} from './MyPageScreen'

import {useAppSelector} from '../../hooks'
import * as theme from '../../theme'

export const MyPage = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  return isLoggedIn ? <MyPageScreen /> : <Login />
}

const styles = StyleSheet.create({})
