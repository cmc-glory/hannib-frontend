import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {LocationIcon} from '../utils'
import * as theme from '../../theme'

const SharingTimeLocationItem = () => {
  return (
    <View style={[theme.styles.rowSpaceBetween, {marginBottom: 12}]}>
      <Text style={{fontSize: 16, color: theme.gray700}}>22.06.11 14:00</Text>
      <View style={[theme.styles.rowFlexStart]}>
        <Text style={{fontSize: 16, marginRight: 8, color: theme.gray700}}>블루스퀘어</Text>
        <LocationIcon />
      </View>
    </View>
  )
}

export const SharingTimeLocation = () => {
  return (
    <View>
      <SharingTimeLocationItem />
      <SharingTimeLocationItem />
      <SharingTimeLocationItem />
    </View>
  )
}

const styles = StyleSheet.create({})
