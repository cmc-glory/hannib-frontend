import React, {useMemo} from 'react'
import {StyleSheet, View, Dimensions} from 'react-native'
import {Carousel} from '../utils/Carousel'

const {width} = Dimensions.get('window')

type HeaderImageProps = {
  images: any
}

export const HeaderImage = ({images}: HeaderImageProps) => {
  const tempImages: string[] | undefined = useMemo(() => images?.map((item: any) => item.imgUrl), [])
  return tempImages == undefined ? <View style={{height: 350, backgroundColor: 'black'}}></View> : <Carousel imageUrls={tempImages} imageWidth={width} />
}
const styles = StyleSheet.create({
  image: {
    width: '100%',
    resizeMode: 'cover',
  },
})
