import React, {useRef, useMemo, useCallback, useState} from 'react'
import {StyleSheet, Pressable, FlatList, View, Animated, Dimensions} from 'react-native'
import type {NativeSyntheticEvent, NativeScrollEvent} from 'react-native'
import ImageView from 'react-native-image-viewing'
import FastImage from 'react-native-fast-image'

import {useAnimatedValue, useMonitorAnimatedValue, useTransformStyle} from '../../hooks'
import * as theme from '../../theme'

export type CarouselProps = {
  imageUrls: string[]
  imageWidth: number
}

const CIRCLE_WIDTH = 6,
  CIRCLE_MARGIN_RIGHT = 8

export const Carousel = ({imageUrls, imageWidth}: CarouselProps) => {
  const flatlistRef = useRef<FlatList | null>(null)
  const selectedIndexAnimValue = useAnimatedValue() // 현재 image index
  const circleWidthAnimValue = useAnimatedValue(CIRCLE_WIDTH) // Animated 연산을 하기 위해 Animated.value type으로 만듦
  const circleMarginRightAnimValue = useAnimatedValue(CIRCLE_MARGIN_RIGHT) // Animated 연산을 하기 위해 Animated.value type으로 만듦
  const [showImageView, setShowImageView] = useState(false)
  const [imageIndex, setImageIndex] = useState<number>(0)

  const imageViewAssets = useMemo(() => {
    return imageUrls.map(url => {
      return {uri: url}
    })
  }, [])

  const translateX = useTransformStyle({
    translateX: Animated.multiply(selectedIndexAnimValue, Animated.add(circleWidthAnimValue, circleMarginRightAnimValue)),
  })

  const selectImage = (index: number) => () => {
    flatlistRef.current?.scrollToIndex({index})
  }

  const CIRCLE_MARGIN = useMemo(() => {
    const imageNum = imageUrls.length
    return (Dimensions.get('window').width - imageNum * CIRCLE_WIDTH - (imageNum - 1) * CIRCLE_MARGIN_RIGHT) / 2
  }, [])

  const circles = useMemo(() => imageUrls.map((uri, index) => <View key={index} style={styles.circle} />), [])

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (imageWidth == 0) return

      const {contentOffset} = event.nativeEvent
      const index = Math.round(contentOffset.x / imageWidth)
      selectedIndexAnimValue.setValue(index)
    },
    [imageWidth],
  )

  const onPressImage = useCallback((index: number) => {
    setImageIndex(index)
    setShowImageView(true)
  }, [])

  return (
    <View>
      <ImageView images={imageViewAssets} imageIndex={imageIndex} visible={showImageView} onRequestClose={() => setShowImageView(false)} swipeToCloseEnabled />
      <FlatList
        bounces={false}
        ref={flatlistRef}
        scrollEnabled={true}
        pagingEnabled
        onScroll={onScroll}
        contentContainerStyle={{width: imageUrls.length * imageWidth}}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={imageUrls}
        renderItem={({item, index}) => (
          <Pressable onPress={() => onPressImage(index)}>
            <FastImage source={{uri: item}} style={[styles.image, {width: imageWidth, height: 340}]} />
          </Pressable>
        )}
        //keyExtractor={(item, index) => index.toString()}
      />
      <View style={[styles.iconBar, {justifyContent: 'center', marginLeft: CIRCLE_MARGIN}]}>
        <View style={{flexDirection: 'row'}}>
          {circles}
          <Animated.View style={[styles.circle, styles.selectedCircle, translateX]} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    //height: 150,
    //resizeMode: 'cover',
  },
  iconBar: {
    marginTop: 40,
    flexDirection: 'row',
    padding: 5,
    position: 'absolute',
    zIndex: 10,
    bottom: 30,
  },
  circle: {
    width: CIRCLE_WIDTH,
    height: CIRCLE_WIDTH,
    borderRadius: CIRCLE_WIDTH / 2,
    marginRight: CIRCLE_MARGIN_RIGHT,
    backgroundColor: theme.white,
  },
  selectedCircle: {
    position: 'absolute',
    backgroundColor: theme.gray800,
  },
})
