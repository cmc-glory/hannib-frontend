import React from 'react'
import {View, Text, Pressable, StyleSheet, Platform} from 'react-native'
import FastImage from 'react-native-fast-image'
import {useNavigation} from '@react-navigation/native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useDispatch} from 'react-redux'
import {StackHeader, BellIcon} from '../../components/utils'
import {GoogleSignin} from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import {KakaoOAuthToken, KakaoProfile, getProfile as getKakaoProfile, login} from '@react-native-seoul/kakao-login'
import {useMutation} from 'react-query'
import {queryKeys, getAccountInfo} from '../../api'

import {login as ReduxLogin} from '../../redux/slices/auth'
import * as theme from '../../theme'
import {showMessage} from 'react-native-flash-message'
import appleAuth, {AppleRequestResponse} from '@invertase/react-native-apple-authentication'
import {storeString, useAppDispatch, getString} from '../../hooks'

const ios = Platform.OS == 'ios'

type LoginButtonProps = {
  label: string
  source: object
  onPress?: () => void
  style?: any
  textStyle?: any
}

const LoginButton = ({label, source, onPress, style, textStyle}: LoginButtonProps) => {
  return (
    <Pressable style={[styles.loginButtonWrapper, style]} onPress={onPress}>
      <FastImage style={styles.logo} source={source}></FastImage>
      <Text style={[styles.label, textStyle]}>{label}</Text>
    </Pressable>
  )
}

export const Login = () => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()

  const getAccountInfoQuery = useMutation(queryKeys.accountInfo, getAccountInfo, {
    onSuccess(data, variables, context) {
      if (data == '') {
        // accountIdx 값이 async storage에 있지만 해당 계정 정보가 없는 경우
        // 이런 경우가 있는 지는 모르겠지만....
        navigation.navigate('LoginStackNavigator', {
          screen: 'SetProfile',
          params: {
            email: data.email,
          },
        })
      } else {
        dispatch(
          ReduxLogin({
            accountIdx: 9,
            email: 'js7056@naver.com',
            name: '진실',
            userCategory: [
              {
                accountIdx: 9,
                job: '가수',
                category: 'bts',
              },
            ],
            profileImageUri: '',
            holdingSharingCnt: 6,
            participateSharingCnt: 7,
          }),
        )
        storeString('accountIdx', data.accountIdx)
      }
    },
    onError(error, variables, context) {
      console.log(error)
    },
  })

  const signInWithKakao = async (): Promise<void> => {
    //console.log('clicked')
    try {
      const token: KakaoOAuthToken = await login()
      const profile: KakaoProfile = await getKakaoProfile()

      // async storage에서 accountIdx 가져와서 해당 accountIdx에 대한 정보가 있는 지 확인
      getString('accountIdx').then(idx => {
        if (idx == null || idx == '' || idx == undefined) {
          //accountIdx가 async storage에 없으면, 회원 가입 페이지로 이동
          navigation.navigate('LoginStackNavigator', {
            screen: 'SetProfile',
            params: {
              email: profile.email,
            },
          })
          return
        }
        const accountIdx = parseInt(idx)
        // async storage에 accountIdx가 있으면, 해당 accountIdx에 대한 계정 정보가 있는지 확인
        //getAccountInfoQuery.mutate(accountIdx)
        getAccountInfo(accountIdx)
          .then(res => {
            if (res.data == '') {
              navigation.navigate('LoginStackNavigator', {
                screen: 'SetProfile',
                params: {
                  email: profile.email,
                },
              })
            } else {
              dispatch(
                ReduxLogin({
                  accountIdx: 9,
                  email: 'js7056@naver.com',
                  name: '진실',
                  userCategory: [
                    {
                      accountIdx: 9,
                      job: '가수',
                      category: 'bts',
                    },
                  ],
                  profileImageUri: '',
                  holdingSharingCnt: 6,
                  participateSharingCnt: 7,
                }),
              )
              storeString('accountIdx', res.data.accountIdx)
            }
          })
          .catch(err => {
            console.log(err)
          })
      })
    } catch (err) {
      console.log(err)
      showMessage({
        message: '카카오 로그인 중 에러가 발생했습니다',
        type: 'info',
        animationDuration: 300,
        duration: 1350,
        style: {
          backgroundColor: 'rgba(36, 36, 36, 0.9)',
        },
        titleStyle: {
          fontFamily: 'Pretendard-Medium',
        },
        floating: true,
      })
    }
  }

  const SignInWithGoogle = async () => {
    const result = await GoogleSignin.signIn()

    const idToken = result.idToken
    const user = result.user
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)
    auth().signInWithCredential(googleCredential)

    //1. 해당 이메일로 가입 됐는지 확인

    //1-1. 가입 돼있음 -> 로그인
    fetch('http://localhost:8081/src/data/dummyUser.json', {
      method: 'get',
    })
      .then(res => res.json())
      .then(result => {
        dispatch(
          ReduxLogin({
            email: result.email,
            name: result.name,
            profileImageUri: result.profileImageUri,
            userCategory: [],
            holdingSharingCnt: result.holdingSharingCnt,
            participateSharingCnt: result.participateSharingCnt,
            accountIdx: 0,
          }),
        )
      })
    //로그인 시 asyncStorage에 user의 email값 저장
    storeString('email', user.email)
    // 1-2. 가입 안돼있는 사람이면 회원가입 화면으로
    // navigation.navigate('LoginStackNavigator', {
    //   screen: 'SetProfile',
    //   params: {
    //     email: profile.email,
    //   },
    // })
  }

  const SignInWithApple = async () => {
    try {
      const appleAuthRequestResponse: AppleRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      })
      const {user, nonce, identityToken} = appleAuthRequestResponse
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce)
      auth().signInWithCredential(appleCredential)

      //1. 해당 이메일로 가입 됐는지 확인

      //1-1. 가입 돼있음 -> 로그인
      fetch('http://localhost:8081/src/data/dummyUser.json', {
        method: 'get',
      })
        .then(res => res.json())
        .then(result => {
          dispatch(
            ReduxLogin({
              email: result.email,
              name: result.name,
              profileImageUri: result.profileImageUri,
              userCategory: [],
              holdingSharingCnt: result.holdingSharingCnt,
              participateSharingCnt: result.participateSharingCnt,
              accountIdx: 0,
            }),
          )
        })
      //로그인 시 asyncStorage에 user의 email값 저장
      storeString('email', appleAuthRequestResponse.email!)
      // 1-2. 가입 안돼있는 사람이면 회원가입 화면으로
      // navigation.navigate('LoginStackNavigator', {
      //   screen: 'SetProfile',
      //   params: {
      //     email: profile.email,
      //   },
      // })
    } catch (error: any) {
      if (error.code === appleAuth.Error.CANCELED) {
        console.warn('User canceled Apple Sign in.')
      } else {
        console.error(error)
        showMessage({
          message: '애플 로그인 중 에러가 발생했습니다',
          type: 'info',
          animationDuration: 300,
          duration: 1350,
          style: {
            backgroundColor: 'rgba(36, 36, 36, 0.9)',
          },
          titleStyle: {
            fontFamily: 'Pretendard-Medium',
          },
          floating: true,
        })
      }
    }
  }

  return (
    <SafeAreaView style={[theme.styles.safeareaview]}>
      <StackHeader title="마이페이지">
        <BellIcon />
      </StackHeader>
      <View style={styles.container}>
        <View style={{marginTop: -32}}>
          <Text style={{marginBottom: 8}}>아직 회원이 아니신가요?</Text>
          <Text style={[theme.styles.bold20, {marginBottom: 48}]}>SNS 간편 로그인 후 사용해보세요!</Text>
          <View style={[styles.loginButtonContainer]}>
            <LoginButton
              label="Kakao로 로그인"
              style={{backgroundColor: '#fddc3f'}}
              source={require('../../assets/images/kakao_logo.png')}
              onPress={signInWithKakao}
            />
            {ios && (
              <LoginButton
                label="Apple로 로그인"
                style={{backgroundColor: theme.black}}
                textStyle={{color: theme.white}}
                source={require('../../assets/images/apple_logo.png')}
                onPress={SignInWithApple}
              />
            )}
            {!ios && (
              <LoginButton
                style={{backgroundColor: theme.white, borderWidth: 1, borderColor: theme.gray200}}
                onPress={SignInWithGoogle}
                label="Google로 로그인"
                source={require('../../assets/images/google_logo.png')}
              />
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  loginButtonContainer: {
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: theme.PADDING_SIZE,
  },
  loginButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.gray50,
    borderRadius: 4,
    marginBottom: 16,
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  label: {
    fontSize: 16,
  },
})
