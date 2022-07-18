import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, Alert, Linking, Platform} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {useMutation} from 'react-query'
import {URL, URLSearchParams} from 'react-native-url-polyfill'
import KeyboardManager from 'react-native-keyboard-manager'

import * as theme from '../../theme'
import {getString, removeString} from '../../hooks'
import {storeAccessToken, login} from '../../redux/slices'
import {queryKeys, getAccountInfoByIdx} from '../../api'
import {useAppDispatch} from '../../hooks'
import {removeListener} from '@reduxjs/toolkit'

if (Platform.OS === 'ios') {
  KeyboardManager.setEnable(true)
  KeyboardManager.setEnableDebugging(false)
  KeyboardManager.setKeyboardDistanceFromTextField(10)
  KeyboardManager.setLayoutIfNeededOnUpdate(true)
  KeyboardManager.setEnableAutoToolbar(false)
  KeyboardManager.setToolbarDoneBarButtonItemText('확인')
  KeyboardManager.setToolbarManageBehaviourBy('subviews') // "subviews" | "tag" | "position"
  KeyboardManager.setToolbarPreviousNextButtonEnable(false)
  KeyboardManager.setToolbarTintColor('#007aff') // Only #000000 format is supported
  KeyboardManager.setToolbarBarTintColor('#FFFFFF') // Only #000000 format is supported
  KeyboardManager.setShouldShowToolbarPlaceholder(true)
  KeyboardManager.setOverrideKeyboardAppearance(false)
  KeyboardManager.setKeyboardAppearance('default') // "default" | "light" | "dark"
  KeyboardManager.setShouldResignOnTouchOutside(true)
  KeyboardManager.setShouldPlayInputClicks(true)
  KeyboardManager.resignFirstResponder()
}

export const SplashScreen = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  // const prefix = 'hannip://hannip/goods/idx='
  // const url = new URL(prefix);

  const getAccountInfoQuery = useMutation('init', getAccountInfoByIdx, {
    onSuccess(data, variables, context) {
      console.log('data :', data)
      if (data == undefined) {
        removeString('accountIdx')
      } else {
        dispatch(
          login({
            ...data,
            holdingSharingCnt: 6,
            participateSharingCnt: 7,
          }),
        )
      }

      navigation.navigate('MainTabNavigator')
    },
    onError(error, variables, context) {
      // 해당 accountIdx 없음
      // 예를 들어 아이폰, 아이패드 둘 다 에서 사용하는데 아이패드에서 탈퇴하고 아이폰에서 앱을 킨 경우
      if (error.response.status == 500) {
        console.log('here')
        removeString('accountIdx').then(res => {
          navigation.navigate('MainTabNavigator')
        })
      }
    },
  })

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
          console.log(accountIdx)
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
      console.log('url1 : ', url)
      const searchParams = new URLSearchParams(url!)
      const idx = searchParams.get('idx')
      console.log(url)
      deepLink(idx!)
      return () => removeListener
    })

    //IOS : 앱이 딥링크로 처음 실행될때, 앱이 열려있지 않을 때 && 앱이 실행 중일 때
    //ANDROID : 앱이 실행 중일 때
    Linking.addEventListener('url', url => {
      //console.log('url2 : ', url)
      const searchParams = new URLSearchParams(url!)
      const idx = searchParams.get('idx')
      addListenerLink(idx!)
      return () => removeListener
    })
  }, [])

  const deepLink = (idx: string) => {
    if (idx) {
      console.log('idx ini deepLink : ', idx)
      navigation.navigate('GoodsStackNavigator', {
        screen: 'NanumDetail',
        params: {
          nanumIdx: idx,
        },
      })
    }
  }
  const addListenerLink = (idx: string) => {
    if (idx) {
      navigation.navigate('GoodsStackNavigator', {
        screen: 'NanumDetail',
        params: {
          nanumIdx: idx,
        },
      })
    }
  }

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
