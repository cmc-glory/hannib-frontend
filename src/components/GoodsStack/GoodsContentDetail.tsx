import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import * as theme from '../../theme'

export const GoodsContentDetail = () => {
  return (
    <View style={{padding: theme.PADDING_SIZE}}>
      <Text style={theme.styles.bold16}>상세 설명</Text>
      <View style={{height: 300, width: '100%'}}></View>
    </View>
  )
}

const styles = StyleSheet.create({})
