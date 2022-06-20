import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {StackHeader} from '../../components/utils'
import * as theme from '../../theme'

export const ReportIssueStep3 = () => {
  return (
    <SafeAreaView style={[styles.rootContainer]}>
      <StackHeader title="문제 신고하기" goBack />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: theme.white,
  },
  container: {
    flex: 1,
  },
})
