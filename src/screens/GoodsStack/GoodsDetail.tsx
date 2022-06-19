import React, {useState, useCallback, useMemo, useEffect, useRef} from 'react'
import {View, Text, ScrollView, Pressable, StyleSheet, Animated, Dimensions} from 'react-native'
import {HeaderImage, Content, GoodsDetailHeader} from '../../components/GoodsStack'
import {useToggle} from '../../hooks'
import {SafeAreaView} from 'react-native-safe-area-context'

export const GoodsDetail = () => {
  const [headerHeight, setHeaderHeight] = useState(0)
  const [shareVisible, toggleShareVisible] = useToggle() // 공유 모달창 띄울지
  const [moreVisible, toggleMoreVisible] = useToggle() // 메뉴 모달창 띄울지

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

  useEffect(() => {
    console.log('headerHeight: ', headerTranslateY)
  }, [headerTranslateY])

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1}}>
      <GoodsDetailHeader moreVisible={moreVisible} toggleMoreVisible={toggleMoreVisible} shareVisible={shareVisible} toggleShareVisible={toggleShareVisible} />
      {/* {headerHeight > 0 ? : null} */}
      <Animated.View style={{...styles.headerContainer, transform: [{translateY: headerTranslateY}]}} onLayout={headerOnLayout} pointerEvents="box-none">
        <HeaderImage />
      </Animated.View>
      <Content headerHeight={headerHeight} scrollY={scrollY} />
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
