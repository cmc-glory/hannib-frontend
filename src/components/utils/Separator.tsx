import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import * as theme from '../../theme'

export const SeparatorBold = () => {
  return <View style={{backgroundColor: theme.gray50, height: 8}}></View>
}
export const SeparatorLight = () => {
  return <View style={{backgroundColor: theme.gray300, height: 1}}></View>
}
