import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {gray100, gray500} from '../../theme'

type TagProps = {
  label: string
}

export const ProductTag = ({label}: TagProps) => {
  return (
    <View style={[styles.tagView]}>
      <Text style={[styles.tagText]}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  tagView: {backgroundColor: gray100, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4, marginRight: 7.5},
  tagText: {color: gray500, fontFamily: 'Pretendard-Medium'},
})
