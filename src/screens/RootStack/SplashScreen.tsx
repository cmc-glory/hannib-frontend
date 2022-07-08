import React, {useEffect} from 'react'
import {View, Text, StyleSheet, Alert} from 'react-native'
import {Linking} from 'react-native'
import {useNavigation} from '@react-navigation/native'

import * as theme from '../../theme'
import {getString} from '../../hooks'
import {storeAccessToken, login} from '../../redux/slices'
import {useAppDispatch} from '../../hooks'

export const SplashScreen = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  useEffect(() => {
    getString('accessToken').then(accessToken => {
      console.log('accessToken :', accessToken)
      if (accessToken == '' || accessToken == undefined) {
        // access token이 없으면 회원 가입 페이지로 이동
        navigation.navigate('LoginStackNavigator')
      } else {
        //dispatch(storeAccessToken(accessToken)) // redux에 accesss
        // accessToken으로 id, email, 카테고리 저장
        storeAccessToken(accessToken)
        // qna list 받아오기
        fetch('http://localhost:8081/src/data/dummyUser.json', {
          method: 'get',
        })
          .then(res => res.json())
          .then(result => {
            dispatch(
              login({
                email: result.email,
                name: result.name,
                profileImageUri: result.profileImageUri,
                userCategory: [
                  {id: '1', name: '세븐틴'},
                  {id: '2', name: '에스파'},
                  {id: '3', name: '아이브'},
                ],
                holdingSharingCnt: result.holdingSharingCnt,
                participateSharingCnt: result.participateSharingCnt,
                accountIdx: 0,
              }),
            )
          })
          .then(() => {
            // access token이 있으면 메인탭으로 이동
            navigation.navigate('MainTabNavigator')
          })
      }
    })
  }, [])

  useEffect(() => {
    Linking.getInitialURL() // 최초 실행 시에 Universal link 또는 URL scheme요청이 있었을 때 여기서 찾을 수 있음
      .then(value => {
        console.log(value)
      })

    Linking.addEventListener('url', e => {
      // 앱이 실행되어있는 상태에서 요청이 왔을 때 처리하는 이벤트 등록
      const route: any = e.url.replace(/.*?:\/\//g, '')
      console.log(route)
      Alert.alert('add e.url', e.url)
    })

    return () => {
      Linking.removeEventListener('url', e => {
        Alert.alert('remove e.url', e.url)
      })
    }
  })

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
