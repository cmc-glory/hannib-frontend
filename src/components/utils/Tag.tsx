import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {black, white} from '../../theme'

type TagProps = {
  label: string
}

const Tag = ({label}: TagProps) => {
  return (
    <View style={[styles.tagView]}>
      <Text style={[styles.tagText]}>{label}</Text>
    </View>
  )
}

export default Tag

const styles = StyleSheet.create({
  tagView: {backgroundColor: black, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 3, marginRight: 7.5},
  tagText: {color: white, fontWeight: '600'},
})
