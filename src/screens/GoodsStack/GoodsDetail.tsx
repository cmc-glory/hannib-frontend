import React, {useState, useRef} from 'react'
import {ScrollView, StyleSheet, Animated} from 'react-native'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import {useNavigation} from '@react-navigation/native'
import {HeaderImage, GoodsDetailContent, GoodsDetailHeader} from '../../components/GoodsStack'
import {useAnimatedValue, useMonitorAnimatedValue} from '../../hooks'
import {SafeAreaView} from 'react-native-safe-area-context'
import * as theme from '../../theme'

const IMAGE_HEIGHT = 350

//const AnimatedCarousel = Animated.createAnimatedComponent(HeaderImage)

export const GoodsDetail = () => {
  const navigation = useNavigation()
  const scrollViewRef = useRef<ScrollView>(null)
  const [headerHeight, setHeaderHeight] = useState(350)
  const [scrollEnabled, setScrollEnabled] = useState(true)
  const scrollY = useAnimatedValue(0)
  const realScrollY = useMonitorAnimatedValue(scrollY)
  const [y, setY] = useState<number>(realScrollY)
  //const realScrollY = useMonitorAnimatedValue(scrollY)
  console.log(realScrollY)

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1, position: 'relative'}}>
      <GoodsDetailHeader />

      <ScrollView
        bounces={false}
        ref={scrollViewRef}
        scrollEventThrottle={0}
        scrollEnabled
        bouncesZoom={false}
        onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
          useNativeDriver: false,
        })}>
        <HeaderImage />
        <GoodsDetailContent headerHeight={headerHeight} scrollY={scrollY} />
      </ScrollView>
    </SafeAreaView>
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
    //position: 'absolute',
    height: 360,
  },

  contentContainer: {
    minHeight: 1200,
  },
})
