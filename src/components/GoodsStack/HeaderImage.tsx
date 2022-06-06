import React from 'react'
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native'
import FastImage from 'react-native-fast-image'
const {width} = Dimensions.get('window')

type HeaderImageProps = {
  style?: any
}

export const HeaderImage = ({style}: HeaderImageProps) => {
  return <FastImage source={require('../../assets/images/detail_image_example.png')} style={[styles.image, style]} />
}
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 350,

    //height: '100%',
    resizeMode: 'cover',
  },
})
