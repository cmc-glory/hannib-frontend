import React, {useState, useRef} from 'react'
import {View, ScrollView, StyleSheet, Dimensions, Animated} from 'react-native'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import {useNavigation} from '@react-navigation/native'
import {HeaderImage, GoodsDetailContent, GoodsDetailHeader} from '../../components/GoodsStack'
import {useAnimatedValue, useMonitorAnimatedValue} from '../../hooks'
import {SafeAreaView} from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import * as theme from '../../theme'

const IMAGE_HEIGHT = 350
const TOP_HEIGHT = getStatusBarHeight() + 48
const WIDTH = Dimensions.get('window').width

export const GoodsDetail = () => {
  const navigation = useNavigation()
  const scrollViewRef = useRef<ScrollView>(null)
  const [headerHeight, setHeaderHeight] = useState(350)
  const [scrollEnabled, setScrollEnabled] = useState(true)
  const scrollY = useAnimatedValue(0)
  const realScrollY = useMonitorAnimatedValue(scrollY)
  const [y, setY] = useState<number>(realScrollY)
  const [headerInvert, setHeaderInvert] = useState(false)
  //const realScrollY = useMonitorAnimatedValue(scrollY)
  //console.log(realScrollY)

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1, position: 'relative'}}>
      {headerInvert ? (
        <View style={{position: 'absolute', width: WIDTH, height: TOP_HEIGHT, zIndex: 99, backgroundColor: 'white'}}></View>
      ) : (
        <LinearGradient
          colors={['rgba(33, 33, 33, 0.3)', 'rgba(255, 255, 255, 0)']}
          locations={[0, 0.99]}
          style={{position: 'absolute', width: WIDTH, height: TOP_HEIGHT, zIndex: 99}}></LinearGradient>
      )}

      <GoodsDetailHeader inverted={headerInvert} />

      <ScrollView
        bounces={false}
        ref={scrollViewRef}
        scrollEventThrottle={1}
        scrollEnabled
        bouncesZoom={false}
        onScroll={(e: any) => {
          if (e.nativeEvent.contentOffset.y >= IMAGE_HEIGHT - TOP_HEIGHT - 48) {
            setHeaderInvert(true)
          } else {
            setHeaderInvert(false)
          }
          Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
            useNativeDriver: false,
          })
        }}>
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
