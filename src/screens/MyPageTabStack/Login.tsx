import React from 'react'
import {View, Text, Pressable, StyleSheet, Platform} from 'react-native'
import FastImage from 'react-native-fast-image'
import {useNavigation} from '@react-navigation/native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useDispatch} from 'react-redux'
import {StackHeader, BellIcon} from '../../components/utils'
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
import {login as ReduxLogin} from '../../redux/slices/auth'
import * as theme from '../../theme'
import {showMessage} from 'react-native-flash-message'
import appleAuth, {AppleRequestResponse} from '@invertase/react-native-apple-authentication'

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
  const dispatch = useDispatch()
  const signInWithKakao = async (): Promise<void> => {
    //console.log('clicked')
    const token: KakaoOAuthToken = await login()
    const profile: KakaoProfile = await getKakaoProfile()

    // 해당 이메일로 가입된 id가 있는 지 확인.
    // 없으면 가입 시킴. 있으면 로그인.

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
      .then(() => {
        //console.log('here')
        navigation.navigate('LoginStackNavigator', {
          screen: 'SetProfile',
          params: {
            email: profile.email,
          },
        })
      })
  }

  const SignInWithGoogle = async () => {
    const result = await GoogleSignin.signIn()

    const idToken = result.idToken
    const user = result.user
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)
    auth().signInWithCredential(googleCredential)

    // 해당 이메일로 가입된 id가 있는 지 확인.
    // 없으면 가입 시킴. 있으면 로그인.

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
      .then(() => {
        navigation.navigate('LoginStackNavigator', {
          screen: 'SetProfile',
          params: {
            email: user.email,
          },
        })
      })
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
        .then(() => {
          navigation.navigate('LoginStackNavigator', {
            screen: 'SetProfile',
            params: {
              email: appleAuthRequestResponse.email,
            },
          })
        })
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
