import React from 'react'
import {StyleSheet, View, Dimensions} from 'react-native'
import {Carousel} from '../utils/Carousel'

const {width} = Dimensions.get('window')

type HeaderImageProps = {
  images: string[] | undefined
}

const images = [
  'http://localhost:8081/src/assets/images/detail_image_example.png',
  'http://localhost:8081/src/assets/images/detail_image_example2.jpeg',
  'http://localhost:8081/src/assets/images/detail_image_example3.jpeg',
]

export const HeaderImage = ({images}: HeaderImageProps) => {
  console.log('images : ', images)
  return images === undefined ? <View></View> : <Carousel imageUrls={images} imageWidth={width} />
}
const styles = StyleSheet.create({
  image: {
    width: '100%',
    resizeMode: 'cover',
  },
})
