import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import * as theme from '../../theme'

export const Login = () => {
  return (
    <SafeAreaView style={[styles.container]}>
      <View style={[styles.loginButtonContainer]}></View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
  },
  loginButtonContainer: {},
})
