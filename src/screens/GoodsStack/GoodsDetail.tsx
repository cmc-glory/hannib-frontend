import React, {useState, useCallback, useMemo, useRef} from 'react'
import {View, Text, ScrollView, StyleSheet, Animated, Dimensions} from 'react-native'
import {HeaderImage, Content, GoodsDetailHeader} from '../../components/GoodsStack'
import {SafeAreaView} from 'react-native-safe-area-context'

export const GoodsDetail = () => {
  const [headerHeight, setHeaderHeight] = useState(0)

  const scrollY = useRef(new Animated.Value(0)).current
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [0, -headerHeight / 4],
    extrapolate: 'clamp',
  })
  const headerOnLayout = useCallback((event: any) => {
    const {height} = event.nativeEvent.layout
    setHeaderHeight(height)
  }, [])

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <GoodsDetailHeader />
      {headerHeight > 0 ? <Content headerHeight={headerHeight} scrollY={scrollY} /> : null}
      <Animated.View style={{...styles.headerContainer, transform: [{translateY: headerTranslateY}]}} onLayout={headerOnLayout} pointerEvents="box-none">
        <HeaderImage />
      </Animated.View>
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
    position: 'absolute',
  },
  contentContainer: {
    minHeight: 1200,
  },
})
