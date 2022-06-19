import React from 'react'
import {View, Text, StyleSheet, Platform, Pressable} from 'react-native'
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

  const signInWithKakao = async (): Promise<void> => {
    console.log('clicked')
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
              onPress={SignInWithGoogle}
            />
          )}
          {!ios && <LoginButton style={{backgroundColor: theme.white}} label="Google로 로그인" source={require('../../assets/images/google_logo.png')} />}
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
