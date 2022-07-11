import React, {useEffect} from 'react'
import {View, Text, StyleSheet, Platform, Pressable} from 'react-native'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import {SafeAreaView} from 'react-native-safe-area-context'
import {GoogleSignin} from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import {KakaoOAuthToken, KakaoProfile, getProfile as getKakaoProfile, login} from '@react-native-seoul/kakao-login'
import {appleAuth} from '@invertase/react-native-apple-authentication'
import {AppleRequestResponse} from '@invertase/react-native-apple-authentication'
import {useNavigation} from '@react-navigation/native'
import {showMessage} from 'react-native-flash-message'
import * as theme from '../../theme'
import {LogoWhiteIcon} from '../../components/utils'
import {storeString, useAppSelector} from '../../hooks'
import AsyncStorage, {useAsyncStorage} from '@react-native-async-storage/async-storage'

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

const ios = Platform.OS == 'ios'

export const Login = () => {
  const navigation = useNavigation()
  const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

  useEffect(() => {
    console.log('isLoggedin : ', isLoggedIn)
  }, [isLoggedIn])
  const signInWithKakao = async (): Promise<void> => {
    //console.log('clicked')
    try {
      const token: KakaoOAuthToken = await login()
      const profile: KakaoProfile = await getKakaoProfile()

      //로그인 시 asyncStorage에 user의 email값 저장
      storeString('email', profile.email)

      navigation.navigate('MainTabNavigator')
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
    try {
      const result = await GoogleSignin.signIn()
      const idToken = result.idToken
      const user = result.user
      const googleCredential = auth.GoogleAuthProvider.credential(idToken)
      auth().signInWithCredential(googleCredential)

      //로그인 시 asyncStorage에 user의 email값 저장
      storeString('email', user.email)
      navigation.navigate('MainTabNavigator')
    } catch (err) {
      console.log(err)
      showMessage({
        message: '구글 로그인 중 에러가 발생했습니다',
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

  const SignInWithApple = async () => {
    try {
      const appleAuthRequestResponse: AppleRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      })

      console.log('appleAuthRequestResponse', appleAuthRequestResponse)

      const {user, nonce, identityToken} = appleAuthRequestResponse
      const email: any = appleAuthRequestResponse.email

      if (identityToken) {
        console.log(nonce, identityToken)
      } else {
        console.log('NO TOKEN')
      }

      console.log(`Apple Authentication Completed, ${user}, ${email}`)
      // Create a Firebase credential from the response
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce)
      auth().signInWithCredential(appleCredential)

      //로그인 시 asyncStorage에 user의 email값 저장
      storeString('email', email)
      navigation.navigate('MainTabNavigator')
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

  appleAuth.isSupported &&
    useEffect(() => {
      return appleAuth.onCredentialRevoked(async () => {
        console.warn('If this function executes, User Credentials have been Revoked')
      })
    }, [])

  return (
    <LinearGradient
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      colors={['rgba(141, 91, 255, 0.5)', 'rgba(255, 173, 193, 0.5)', 'rgba(255, 255, 255, 0.5)']}
      style={{flex: 1}}>
      <SafeAreaView style={[theme.styles.wrapper, styles.rootContainer]}>
        <View style={[styles.titleContainer]}>
          {/* <FastImage source={require('../../assets/logo_white.png')} style={styles.logoWhite} /> */}
          <LogoWhiteIcon size={82} />
          <Text style={[styles.title, theme.styles.bold16]}>한입과 함께 즐겁게 굿즈를 나눔하세요</Text>
        </View>
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
              style={{backgroundColor: theme.white}}
              onPress={SignInWithGoogle}
              label="Google로 로그인"
              source={require('../../assets/images/google_logo.png')}
            />
          )}
        </View>
        <Text style={styles.logoText}>hannip</Text>
      </SafeAreaView>
    </LinearGradient>
  )
}
const styles = StyleSheet.create({
  logoText: {
    fontFamily: 'Lexend-Bold',
    color: theme.secondary,
    fontSize: 20,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 56,
  },
  logoWhite: {
    width: 79.33,
    height: 85,
    resizeMode: 'cover',
  },
  title: {
    marginTop: 30,
    marginBottom: 60,
    color: theme.white,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: theme.white,
    justifyContent: 'center',
  },
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  loginButtonContainer: {
    justifyContent: 'space-between',
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
