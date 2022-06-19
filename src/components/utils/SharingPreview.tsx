import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import FastImage from 'react-native-fast-image'
import * as theme from '../../theme'

type SharingPreviewProps = {
  uri: string
  category: string
  title: string
}

export const SharingPreview = ({uri, category, title}: SharingPreviewProps) => {
  return (
    <FastImage source={{uri: uri}} style={styles.thumbnailImage}>
      <View style={styles.thumbnailImageOverlay} />
      <View style={{padding: theme.PADDING_SIZE, alignSelf: 'stretch', justifyContent: 'space-between', zIndex: 1}}>
        <Text style={{color: theme.white, marginBottom: 5}}>{category}</Text>
        <Text style={[theme.styles.bold16, {color: theme.white}]}>{title}</Text>
      </View>
    </FastImage>
  )
}

const styles = StyleSheet.create({
  thumbnailImage: {
    leftQuantity: {
      color: theme.gray700,
    },
    height: 84,
    width: '100%',
    borderRadius: 10,
  },
  thumbnailImageOverlay: {
    backgroundColor: 'rgba(32,32,33,0.5)',
    //backgroundColor: 'red',
    width: '100%',
    height: 84,
    borderRadius: 10,
    position: 'absolute',
    zIndex: 1,
  },
})
