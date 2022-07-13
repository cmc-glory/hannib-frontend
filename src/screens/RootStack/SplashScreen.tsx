import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Alert, Linking} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {useMutation} from 'react-query'

import * as theme from '../../theme'
import {getString} from '../../hooks'
import {storeAccessToken, login} from '../../redux/slices'
import {queryKeys, getAccountInfoByIdx} from '../../api'
import {useAppDispatch} from '../../hooks'
import {removeListener} from '@reduxjs/toolkit'

export const SplashScreen = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const [isDeepLink, setIsDeepLink] = useState<boolean>(false)

  const getAccountInfoQuery = useMutation('init', getAccountInfoByIdx, {
    onSuccess(data, variables, context) {
      console.log('reached')
      //나중에 api 수정되면 data 값 넣어주기

      dispatch(
        login({
          ...data,
          holdingSharingCnt: 6,
          participateSharingCnt: 7,
        }),
      )

      navigation.navigate('MainTabNavigator')
    },
    onError(error, variables, context) {
      console.log(error)
    },
  })

  //useEffect(() => {}, [isDeepLink])

  useEffect(() => {
    // async storage에서 account Idx가져오기
    getString('accountIdx').then(accountIdx => {
      if (accountIdx == '' || accountIdx == undefined || accountIdx == null || accountIdx == 'null') {
        // 저장된 accountIdx가 없으면 메인 페이지로 이동
        navigation.navigate('MainTabNavigator')
      } else {
        getString('accessToken').then(accessToken => {
          //if (accessToken == '' || accessToken == undefined || accessToken == null || accessToken == 'null') {
          //  // access token이 없으면 메인 페이지로 이동
          //  navigation.navigate('MainTabNavigator')
          //} else {
          //dispatch(storeAccessToken(accessToken!)) // redux에 accesss
          // accessToken으로 id, email, 카테고리 저장
          getAccountInfoQuery.mutate(parseInt(accountIdx))

          dispatch(storeAccessToken('1111'))
          //storeAccessToken(accessToken!)
          // qna list 받아오기

          //}
        })
      }
    })

    // ************************* Deep Link *************************x
    //IOS && ANDROID : 앱이 딥링크로 처음 실행될때, 앱이 열려있지 않을 때
    Linking.getInitialURL().then(url => {
      deepLink(url!)
      console.log('url1 : ', url)
      console.log('isDeepLink11 : ', isDeepLink)
      return () => removeListener
      //return () => removeListener
    })

    //IOS : 앱이 딥링크로 처음 실행될때, 앱이 열려있지 않을 때 && 앱이 실행 중일 때
    //ANDROID : 앱이 실행 중일 때
    Linking.addEventListener('url', url => {
      console.log('url2 : ', url)
      addListenerLink
      return () => removeListener
    })
  }, [])

  const deepLink = (url: string) => {
    if (url) {
      navigation.navigate('GoodsStackNavigator', {
        screen: 'NanumDetail',
        params: {
          nanumIdx: 68,
        },
      })
    }
  }
  const addListenerLink = ({url}) => {
    if (url) {
      navigation.navigate('GoodsStackNavigator', {
        screen: 'NanumDetail',
        params: {
          nanumIdx: 68,
        },
      })
    }
  }

  // const remover = () => {
  //   Linking.removeEventListener('url')
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.appname}>한입</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appname: {
    color: theme.main,
    fontFamily: 'Pretendard-Bold',
    fontSize: 24,
  },
})
