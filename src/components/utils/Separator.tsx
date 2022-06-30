import React from 'react'
import {View, Text, StyleSheet, ViewStyle} from 'react-native'
import * as theme from '../../theme'

export const SeparatorBold = () => {
  return <View style={{backgroundColor: theme.gray50, height: 8}}></View>
}
export const SeparatorLight = ({style}: {style?: ViewStyle}) => {
  return <View style={[{backgroundColor: theme.gray200, height: 1}, style]}></View>
}
