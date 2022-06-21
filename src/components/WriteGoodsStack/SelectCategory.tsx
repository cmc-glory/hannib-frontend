import React from 'react'
import {View, Text, Pressable, TouchableOpacity, StyleSheet} from 'react-native'
import {RightArrowIcon} from '../utils'
import * as theme from '../../theme'

export const SelectCategory = () => {
  return (
    <View style={[styles.container]}>
      <Text style={[theme.styles.label]}>카테고리</Text>
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
