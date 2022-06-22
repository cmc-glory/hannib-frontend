import React from 'react'
import {StyleSheet, Dimensions} from 'react-native'
import {Carousel} from '../utils/Carousel'

const {width} = Dimensions.get('window')

type HeaderImageProps = {
  style?: any
  imageHeight?: number
}

const images = [
  'http://localhost:8081/src/assets/images/detail_image_example.png',
  'http://localhost:8081/src/assets/images/detail_image_example2.jpeg',
  'http://localhost:8081/src/assets/images/detail_image_example3.jpeg',
]

export const HeaderImage = ({style, imageHeight}: HeaderImageProps) => {
  const [visible, setIsVisible] = React.useState(true)
  return <Carousel imageUrls={images} imageWidth={width} />
}
const styles = StyleSheet.create({
  image: {
    width: '100%',
    resizeMode: 'cover',
  },
})
