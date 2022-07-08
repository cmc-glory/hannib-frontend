import React, {useState, useRef, useCallback} from 'react'
import {View, ScrollView, Dimensions, Animated} from 'react-native'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import {useNavigation, useRoute} from '@react-navigation/native'
import {useQuery} from 'react-query'
import {FloatingBottomButton} from '../../components/utils'
import {HeaderImage, GoodsDetailContent, GoodsDetailHeader} from '../../components/GoodsStack'
import {useAnimatedValue, useAppSelector} from '../../hooks'
import {SafeAreaView} from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import {GoodsDetailRouteProps} from '../../navigation/GoodsStackNavigator'
import {ISharingDetail} from '../../types'
import {queryKeys, getNanumByIndex, getGoodsDetail} from '../../api'
import * as theme from '../../theme'

const IMAGE_HEIGHT = 350
const TOP_HEIGHT = getStatusBarHeight() + 48
const WIDTH = Dimensions.get('window').width

export const GoodsDetail = () => {
  const userid = useAppSelector(state => state.auth.user.email)
  const navigation = useNavigation()
  const route = useRoute<GoodsDetailRouteProps>()

  console.log(route.params)

  const [sharingDetail, setSharingDetail] = useState<ISharingDetail>()
  const scrollViewRef = useRef<ScrollView>(null)
  const [headerHeight, setHeaderHeight] = useState(350)
  const scrollY = useAnimatedValue(0)
  const [headerInvert, setHeaderInvert] = useState(false)

  const {data} = useQuery(queryKeys.goodsDetail, () => getNanumByIndex(parseInt(route.params.nanumIdx)), {
    //const {data} = useQuery(queryKeys.goodsDetail, getGoodsDetail, {
    onSuccess: data => {
      console.log('success')
      setSharingDetail(data)
    },
    onError(err) {
      console.log('err')
      console.log(err)
    },
  })

  const onPressRequest = useCallback(() => {
    console.log('data type : ', data?.type)
    if (data?.type == 'M') {
      navigation.navigate('GoodsRequestOnline')
    } else {
      navigation.navigate('GoodsRequestOffline')
    }
  }, [data])

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

      <GoodsDetailHeader inverted={headerInvert} userid={userid} writerid={data?.writerid} />

      <ScrollView
        bounces={false}
        ref={scrollViewRef}
        scrollEventThrottle={1}
        scrollEnabled
        bouncesZoom={false}
        onScroll={(e: any) => {
          if (e.nativeEvent.contentOffset.y >= IMAGE_HEIGHT - TOP_HEIGHT - 40) {
            setHeaderInvert(true)
          } else {
            setHeaderInvert(false)
          }
          Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {
            useNativeDriver: false,
          })
        }}>
        <HeaderImage images={data?.images} />
        {data !== undefined && <GoodsDetailContent headerHeight={headerHeight} data={data} />}
      </ScrollView>
      <FloatingBottomButton label="신청하기" enabled onPress={onPressRequest} />
    </SafeAreaView>
  )
}
