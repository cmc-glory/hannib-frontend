import React from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'
import FastImage from 'react-native-fast-image'
import {Tag} from '../utils'
import * as theme from '../../theme'
type HoldingProjectItemProps = {
  uri: string
  tagLabel: string
  title: string
  onPressNanum: () => void
}
export const HoldingProjectItem = ({uri, tagLabel, title, onPressNanum}: HoldingProjectItemProps) => {
  return (
    <Pressable style={{marginRight: 16}} onPress={onPressNanum}>
      <View style={[styles.tag]}>
        <Tag label={tagLabel}></Tag>
      </View>

      <FastImage source={{uri: uri}} style={[styles.projectPreview]} />
      <Text numberOfLines={2} style={[theme.styles.bold16, styles.projectTitle]}>
        {title}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  tag: {
    position: 'absolute',
    left: 8,
    top: 8,
    zIndex: 1,
  },
  projectPreview: {
    width: 144,
    height: 144,
    borderRadius: 8,
  },
  projectTitle: {
    width: 144,
    //height: 38,
    marginTop: 8,
    flexWrap: 'wrap',
  },
})
