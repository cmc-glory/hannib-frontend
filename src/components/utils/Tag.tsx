import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {black, main, white} from '../../theme'

type TagProps = {
  label: string
}

export const Tag = ({label}: TagProps) => {
  return (
    <View style={[styles.tagView]}>
      <Text style={[styles.tagText]}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tagView: {backgroundColor: main, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginRight: 7.5},
  tagText: {color: white, fontFamily: 'Pretendard-Medium'},
})
