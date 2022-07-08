import React from 'react'
import {StyleSheet, View, Dimensions} from 'react-native'
import {Carousel} from '../utils/Carousel'

const {width} = Dimensions.get('window')

type HeaderImageProps = {
  images: string[] | undefined
}

export const HeaderImage = ({images}: HeaderImageProps) => {
  return images === undefined ? <View style={{height: 350}}></View> : <Carousel imageUrls={images} imageWidth={width} />
}
const styles = StyleSheet.create({
  image: {
    width: '100%',
    resizeMode: 'cover',
  },
})
