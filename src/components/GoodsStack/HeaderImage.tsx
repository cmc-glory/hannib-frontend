import React, {useMemo} from 'react'
import {StyleSheet, View, Dimensions, ActivityIndicator} from 'react-native'
import {Carousel} from '../utils/Carousel'
import * as theme from '../../theme'
import {INanumImgDto} from '../../types'

const {width} = Dimensions.get('window')

type HeaderImageProps = {
  images: INanumImgDto[] | undefined
}

export const HeaderImage = ({images}: HeaderImageProps) => {
  const tempImages: string[] | undefined = useMemo(() => (images == undefined ? images : images.map((item: any) => item.imgUrl)), [images])
  return tempImages == undefined ? (
    <View style={[styles.loadingView]}>
      <ActivityIndicator animating={images == undefined} />
    </View>
  ) : (
    <Carousel imageUrls={tempImages} imageWidth={width} />
  )
}
const styles = StyleSheet.create({
  loadingView: {
    height: theme.CAROUSEL_HEIGHT,
    backgroundColor: theme.gray200,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
