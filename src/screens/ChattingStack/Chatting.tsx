import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {Carousel} from '../../components/utils/Carousel'

const images = ['http://localhost:8081/src/assets/images/detail_image_example.png', 'http://localhost:8081/src/assets/images/detail_image_example2.png']

export const Chatting = () => {
  return (
    <View>
      <Carousel imageUrls={images} imageWidth={390} />
    </View>
  )
}

const styles = StyleSheet.create({})
