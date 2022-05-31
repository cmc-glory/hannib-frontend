import React, {useState} from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
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

export const MyPage = () => {
  const [result, setResult] = useState<string>('')

  const signInWithKakao = async (): Promise<void> => {
    console.log('kakao login ~~ ')
    const token: KakaoOAuthToken = await login()
    const profile: KakaoProfile | KakaoProfileNoneAgreement = await getKakaoProfile()
    console.log('token : ', JSON.stringify(token))
    console.log('profile : ', JSON.stringify(profile))

    // login()
    //   .then(res => console.log('성공', res))
    //   .catch(error => console.log(error))

    setResult(JSON.stringify(token))
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <TouchableOpacity style={[styles.button]} onPress={() => signInWithKakao()}>
        <Text style={{color: '#fff'}}>Sign in with Kakao</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  button: {
    width: '100%',
    borderColor: 'black',
    backgroundColor: 'black',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 50,
  },
})
