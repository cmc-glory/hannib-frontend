import React from 'react'
import {View, Text, ScrollView, StyleSheet, Image, Dimensions} from 'react-native'
import FastImage from 'react-native-fast-image'

const {width} = Dimensions.get('window')

type HeaderImageProps = {
  style?: any
  imageHeight: number
}

const images = [require('../../assets/images/detail_image_example.png')]

export const HeaderImage = ({style, imageHeight}: HeaderImageProps) => {
  return <Image source={{uri: 'http://localhost:8081/src/assets/images/detail_image_example2.jpeg'}} style={{...styles.image, height: imageHeight}} />
}
const styles = StyleSheet.create({
  image: {
    width: '100%',
    resizeMode: 'cover',
  },
})
