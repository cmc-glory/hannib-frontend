import React from 'react'
import {View, Text, StyleSheet, ImageSourcePropType, Pressable} from 'react-native'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import {SafeAreaView} from 'react-native-safe-area-context'
import {GoogleSignin, GoogleSigninButton} from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import {
  KakaoOAuthToken,
  KakaoProfile,
  KakaoProfileNoneAgreement,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
  loginWithKakaoAccount,
} from '@react-native-seoul/kakao-login'
import {useNavigation} from '@react-navigation/native'
import * as theme from '../../theme'

type LoginButtonProps = {
  label: string
  source: object
  onPress?: () => void
}

const LoginButton = ({label, source, onPress}: LoginButtonProps) => {
  return (
    <Pressable style={styles.loginButtonWrapper} onPress={onPress}>
      <FastImage style={styles.logo} source={source}></FastImage>
      <Text style={[styles.label]}>{label}</Text>
    </Pressable>
  )
}

export const Login = () => {
  const navigation = useNavigation()

  const signInWithKakao = async (): Promise<void> => {
    const token: KakaoOAuthToken = await login()
    const profile: KakaoProfile = await getKakaoProfile()

    navigation.navigate('SelectCategory', {
      email: profile.email,
      name: profile.nickname,
    })
  }

  const SignInWithGoogle = async () => {
    const {idToken, user} = await GoogleSignin.signIn()
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    auth().signInWithCredential(googleCredential)
  }

  return (
    <LinearGradient
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      colors={['rgba(141, 91, 255, 0.5)', 'rgba(255, 173, 193, 0.5)', 'rgba(255, 255, 255, 0.5)']}
      style={{flex: 1}}>
      <SafeAreaView style={[theme.styles.wrapper, styles.rootContainer]}>
        <View style={[styles.titleContainer]}>
          <FastImage source={{uri: 'http://localhost:8081/src/assets/logo_white.png'}} style={styles.logoWhite} />
          <Text style={[styles.title, theme.styles.bold16]}>한입과 함께 즐겁게 굿즈를 나눔하세요</Text>
        </View>
        <View style={[styles.loginButtonContainer]}>
          <LoginButton label="카카오 아이디로 로그인" source={require('../../assets/images/kakao_logo.png')} onPress={signInWithKakao} />
          <LoginButton label="애플 아이디로 로그인" source={require('../../assets/images/apple_logo.png')} onPress={SignInWithGoogle} />
          <LoginButton label="구글 아이디로 로그인" source={require('../../assets/images/google_logo.png')} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}
const styles = StyleSheet.create({
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
    height: 200,
    justifyContent: 'space-between',
  },
  loginButtonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.gray50,
    borderRadius: 4,
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
