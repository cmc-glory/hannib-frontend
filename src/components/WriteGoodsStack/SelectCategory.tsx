import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {RightArrowIcon, NeccesaryField} from '../utils'
import * as theme from '../../theme'

export const SelectCategory = () => {
  return (
    <View style={[styles.container]}>
      <View style={[theme.styles.rowFlexStart]}>
        <Text style={[theme.styles.label]}>카테고리</Text>
        <NeccesaryField />
      </View>

      <TouchableOpacity style={styles.selectContainer}>
        <RightArrowIcon />
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
