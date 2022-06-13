import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {StackHeader} from '../../components/utils'

export const Community = () => {
  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <StackHeader title="커뮤니티" goBack />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
