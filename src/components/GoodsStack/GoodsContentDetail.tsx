import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import * as theme from '../../theme'

export const GoodsContentDetail = ({description}: {description: string}) => {
  return (
    <View style={{padding: theme.PADDING_SIZE}}>
      <Text style={theme.styles.bold16}>상세 설명</Text>
      <View style={[styles.descriptionContainer]}>
        <Text style={{fontSize: 16}}>{description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  descriptionContainer: {
    paddingTop: theme.PADDING_SIZE,
  },
})
