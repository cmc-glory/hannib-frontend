import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import * as theme from '../../theme'

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
  tagView: {
    backgroundColor: theme.main,
    height: 24,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 7.5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  tagText: {color: theme.white, fontFamily: 'Pretendard-Regular', fontSize: 12},
})
