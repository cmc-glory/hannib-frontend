import React, {useState, useRef, useMemo, useCallback} from 'react'
import {View, ScrollView, Dimensions, Animated, Platform, Alert} from 'react-native'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import {useNavigation, useRoute} from '@react-navigation/native'
import {useQuery} from 'react-query'

import {FloatingBottomButton} from '../../components/utils'
import {HeaderImage, NanumDetailContent, NanumDetailHeader} from '../../components/GoodsStack'
import {useAnimatedValue, useAppSelector} from '../../hooks'
import {SafeAreaView} from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient'
import {GoodsDetailRouteProps} from '../../navigation/GoodsStackNavigator'
import {INanum} from '../../types'
import {queryKeys, getNanumByIndex, getInquiryByIndex} from '../../api'

const IMAGE_HEIGHT = 350
const TOP_HEIGHT = getStatusBarHeight() + 56
const SHADOW_HEIGHT = getStatusBarHeight() + 120
const WIDTH = Dimensions.get('window').width

export const NanumDetail = () => {
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
  const user = useAppSelector(state => state.auth.user)
  const navigation = useNavigation()
  const route = useRoute<GoodsDetailRouteProps>()
  const {nanumIdx} = useMemo(() => {
    return route.params
  }, [])

  const [nanumDetail, setNanumDetail] = useState<INanum>()
  const scrollViewRef = useRef<ScrollView>(null)
  const [headerHeight, setHeaderHeight] = useState(350)
  const scrollY = useAnimatedValue(0)
  const [headerInvert, setHeaderInvert] = useState(false)
  const [numInqueries, setNumInqueries] = useState<number>(0)

  const {data} = useQuery(
    [queryKeys.nanumDetail, nanumIdx],
    () =>
      getNanumByIndex({
        nanumIdx: parseInt(nanumIdx),
        accountIdx: user.accountIdx,
        favoritesYn: 'N',
      }),
    {
      //const {data} = useQuery(queryKeys.goodsDetail, getGoodsDetail, {
      onSuccess: data => {
        console.log('success')
        console.log(data)
        setNanumDetail(data)
      },
      onError(err) {
        console.log('err')
        console.log(err)
      },
    },
  )

  useQuery(queryKeys.inquiry, () => getInquiryByIndex(parseInt(nanumIdx)), {
    onSuccess(data) {
      console.log('inquiry length : ', data)
      setNumInqueries(data.length)
    },
    onError(err) {
      console.log(err)
    },
  })

  const onPressRequest = useCallback(() => {
    console.log('data nanumMethod : ', data?.nanumMethod)

    if (isLoggedIn) {
      if (data?.nanumMethod == 'M') {
        navigation.navigate('GoodsStackNavigator', {
          screen: 'GoodsRequestOnline',
          params: nanumIdx,
        })
      } else {
        navigation.navigate('GoodsStackNavigator', {
          screen: 'GoodsRequestOffline',
          params: nanumIdx,
        })
      }
    } else {
      if (Platform.OS == 'ios') {
        Alert.alert('로그인 후 이용할 수 있습니다. 로그인 페이지로 이동하시겠습니까?', '', [
          {
            text: '취소',
          },
          {
            text: '확인',
            onPress: () => navigation.navigate('MyPageTabStackNavigator'),
          },
        ])
      } else {
        Alert.alert('로그인 후 이용할 수 있습니다', '로그인 페이지로 이동하시겠습니까?', [
          {
            text: '취소',
          },
          {
            text: '확인',
            onPress: () => navigation.navigate('MyPageTabStackNavigator'),
          },
        ])
      }
    }
  }, [data, isLoggedIn])

  return (
    <SafeAreaView edges={['bottom']} style={{flex: 1, position: 'relative'}}>
      {headerInvert ? (
        <View style={{position: 'absolute', width: WIDTH, height: TOP_HEIGHT, zIndex: 99, backgroundColor: 'white'}}></View>
      ) : (
        <LinearGradient
          colors={['rgba(33, 33, 33, 0.4)', 'rgba(255, 255, 255, 0)']}
          locations={[0, 0.99]}
          style={{position: 'absolute', width: WIDTH, height: SHADOW_HEIGHT, zIndex: 99}}></LinearGradient>
      )}

      {data != undefined && (
        <NanumDetailHeader
          inverted={headerInvert}
          userAccountIdx={user.accountIdx}
          writerAccountIdx={data.accountIdx}
          nanumIdx={parseInt(route.params.nanumIdx)}
        />
      )}

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
        <HeaderImage images={data?.nanumImglist} />
        {nanumDetail != undefined && <NanumDetailContent headerHeight={headerHeight} nanumDetail={nanumDetail} numInquires={numInqueries} />}
      </ScrollView>
      <FloatingBottomButton label="신청하기" enabled onPress={onPressRequest} />
    </SafeAreaView>
  )
}
