import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import * as theme from '../../theme'

export const InitScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={theme.styles.bold20}>관심 있는 스타를 검색해 주세요!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.PADDING_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
