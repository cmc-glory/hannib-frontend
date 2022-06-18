import React, {useRef, useMemo, useCallback} from 'react'
import {StyleSheet, FlatList, View, Animated} from 'react-native'
import type {NativeSyntheticEvent, NativeScrollEvent} from 'react-native'
import FastImage from 'react-native-fast-image'

import {useAnimatedValue, useMonitorAnimatedValue, useTransformStyle} from '../../hooks'
import * as theme from '../../theme'

export type CarouselProps = {
  imageUrls: string[]
  imageWidth: number
}

const CIRCLE_WIDTH = 10,
  CIRCLE_MARGIN_RIGHT = 5

export const Carousel = ({imageUrls, imageWidth}: CarouselProps) => {
  const flatlistRef = useRef<FlatList | null>(null)
  const selectedIndexAnimValue = useAnimatedValue() // 현재 image index
  const circleWidthAnimValue = useAnimatedValue(CIRCLE_WIDTH) // Animated 연산을 하기 위해 Animated.value type으로 만듦
  const circleMarginRightAnimValue = useAnimatedValue(CIRCLE_MARGIN_RIGHT) // Animated 연산을 하기 위해 Animated.value type으로 만듦

  const translateX = useTransformStyle({
    translateX: Animated.multiply(selectedIndexAnimValue, Animated.add(circleWidthAnimValue, circleMarginRightAnimValue)),
  })

  const selectImage = (index: number) => () => {
    flatlistRef.current?.scrollToIndex({index})
  }

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

  return (
    <>
      <FlatList
        ref={flatlistRef}
        scrollEnabled={true}
        pagingEnabled
        onScroll={onScroll}
        contentContainerStyle={{width: imageUrls.length * imageWidth}}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={imageUrls}
        renderItem={({item}) => <FastImage source={{uri: item}} style={[styles.image, {width: imageWidth, height: 300}]} />}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={[styles.iconBar, {justifyContent: 'center'}]}>
        <View style={{flexDirection: 'row'}}>
          {circles}
          <Animated.View style={[styles.circle, styles.selectedCircle, translateX]} />
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 150,
    resizeMode: 'cover',
  },
  iconBar: {
    marginTop: 40,
    flexDirection: 'row',
    padding: 5,
    position: 'absolute',
    zIndex: 10,
    bottom: 50,
    left: 150,
  },
  circle: {
    width: CIRCLE_WIDTH,
    height: CIRCLE_WIDTH,
    borderRadius: CIRCLE_WIDTH / 2,
    marginRight: CIRCLE_MARGIN_RIGHT,
    backgroundColor: theme.gray300,
  },
  selectedCircle: {
    position: 'absolute',
    backgroundColor: theme.gray700,
  },
})
