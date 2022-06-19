import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {StackHeader} from '../../components/utils'
import * as theme from '../../theme'

export const ParticipatingSharingOnline = () => {
  return (
    <SafeAreaView>
      <StackHeader title="참여한 나눔" goBack />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
