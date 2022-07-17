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
  const [isWriter, setIsWriter] = useState<boolean>(false) // 나눔글 작성자인지
  const [isApplied, setIsApplied] = useState<boolean>(false) // 신청했는지
  const [buttonText, setButtonText] = useState<string>('')

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
        const tempIsWriter = data.accountDto.accountIdx == user.accountIdx
        const tempIsApplied = data.applyOfflineIdx != 0
        setIsWriter(tempIsWriter)
        setIsApplied(tempIsApplied)
        if (tempIsWriter) {
          setButtonText('진행한 나눔 페이지로 이동')
        } else if (tempIsApplied) {
          setButtonText('참여한 나눔 페이지로 이동')
        } else {
          setButtonText('신청하기')
        }
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

    // 로그인을 한 경우
    if (isLoggedIn) {
      // 나눔글 작성자인 경우
      if (isWriter) {
        navigation.navigate('HoldingSharingStackNavigator', {
          screen: 'HoldingSharing',
          params: {
            nanumIdx,
          },
        })
      }
      // 이미 신청한 경우
      else if (isApplied) {
        // 우편 나눔이면
        console.log('already applied')
        if (nanumDetail?.nanumMethod == 'M') {
          console.log('우편')
          navigation.navigate('ParticipatingSharingStackNavigator', {
            screen: 'ParticipatingSharingOnline',
            params: {
              nanumIdx,
            },
          })
        } else {
          console.log('오프라인')

          navigation.navigate('ParticipatingSharingStackNavigator', {
            screen: 'ParticipatingSharingOffline',
            params: {
              nanumIdx,
            },
          })
        }
      }
      // 작성자도 아니고 신청도 안한 경우
      else {
        // 우편 나눔이면
        if (nanumDetail?.nanumMethod == 'M') {
          navigation.navigate('GoodsStackNavigator', {
            screen: 'GoodsRequestOnline',
            params: nanumIdx,
          })
        }
        // 오프라인 나눔이면
        else {
          navigation.navigate('GoodsStackNavigator', {
            screen: 'GoodsRequestOffline',
            params: nanumIdx,
          })
        }
      }
    }
    // 로그인을 안한 경우
    else {
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
  }, [nanumDetail, isLoggedIn, isWriter, isApplied, nanumIdx])

  return (
    <View style={{flex: 1, position: 'relative'}}>
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
      <FloatingBottomButton label={buttonText} enabled onPress={onPressRequest} />
    </View>
  )
}
