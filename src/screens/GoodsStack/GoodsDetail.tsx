import React, {useState, useCallback, useMemo, useEffect, useRef} from 'react'
import {View, Text, ScrollView, Pressable, StyleSheet, Animated, Dimensions, Platform, DynamicColorIOS} from 'react-native'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import {useNavigation} from '@react-navigation/native'
import {HeaderImage, GoodsDetailContent, GoodsDetailHeader} from '../../components/GoodsStack'
import {useAnimatedValue, useMonitorAnimatedValue, useAnimatedStyle, usePanResponder} from '../../hooks'
import {ScrollEnabledProvider, useScrollEnabled} from '../../contexts'
import {FloatingBottomButton} from '../../components/utils'
import {SafeAreaView} from 'react-native-safe-area-context'
import * as theme from '../../theme'

const IMAGE_HEIGHT = 350
const HEADER_HEIGHT = 45
const TOP_MARGIN = HEADER_HEIGHT + getStatusBarHeight()
const TO_MOVE = IMAGE_HEIGHT - TOP_MARGIN - 28

import type {GestureResponderEvent, PanResponderGestureState} from 'react-native'

type Event = GestureResponderEvent
type State = PanResponderGestureState

export const GoodsDetail = () => {
  const navigation = useNavigation()
  const [headerHeight, setHeaderHeight] = useState(0)

  const scrollY = useAnimatedValue(0)
  const fadeValue = useAnimatedValue(0)
  const [animStarted, setAnimStarted] = useState(false)

  const fadeIn = () => {
    setAnimStarted(true)
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 50,
      useNativeDriver: true,
    }).start(() => setAnimStarted(false))
  }

  const fadeOut = () => {
    setAnimStarted(true)
    Animated.timing(fadeValue, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start(() => setAnimStarted(false))
  }

  const opacity = useAnimatedStyle({opacity: fadeValue})

  // 아래 content가 움직인 거의 1/4만큼 이미지가 위로 움직임.
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight / 4],
    extrapolate: 'clamp',
  })

  const animatedBorder = fadeValue.interpolate({
    inputRange: [0, 1],
    outputRange: [24, 0],
    //extrapolate: 'clamp',
  })

  console.log(fadeValue)
  //console.log(animatedBorder)

  // header image의 크기를 알아냄
  const headerOnLayout = useCallback((event: any) => {
    const {height} = event.nativeEvent.layout
    setHeaderHeight(height)
  }, [])

  // for debugging.... 현재 content offset의 scrollY 찍어보기.
  const realScrollY = useMonitorAnimatedValue(scrollY)

  useEffect(() => {
    if (realScrollY > TO_MOVE) {
      //if (realScrollY > TO_MOVE && animStarted == false) {
      fadeIn()
      //} else if (realScrollY < TO_MOVE && animStarted == false) {
    } else if (realScrollY < TO_MOVE) {
      fadeOut()
    }
  }, [realScrollY])

  const onPressRequest = useCallback(() => {
    navigation.navigate('GoodsRequestOnline')
  }, [])

  return (
    <ScrollEnabledProvider>
      <SafeAreaView edges={['bottom']} style={{flex: 1}}>
        <GoodsDetailHeader />
        <Animated.View
          style={{backgroundColor: theme.white, width: '100%', height: TOP_MARGIN, position: 'absolute', top: 0, zIndex: 50, ...opacity}}></Animated.View>
        <Animated.View style={[styles.headerContainer, {transform: [{translateY: headerTranslateY}]}]} onLayout={headerOnLayout} pointerEvents="box-none">
          <HeaderImage imageHeight={IMAGE_HEIGHT} />
        </Animated.View>
        <GoodsDetailContent headerHeight={headerHeight} scrollY={scrollY} animatedBorder={animatedBorder} />
        <FloatingBottomButton label="신청하기" onPress={onPressRequest} enabled />
      </SafeAreaView>
    </ScrollEnabledProvider>
  )
}
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
  },
  headerContainer: {
    width: '100%',
    position: 'absolute',
  },
  contentContainer: {
    minHeight: 1200,
  },
})
