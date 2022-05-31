import React, {useCallback, useState} from 'react'
import {View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import {useNavigation} from '@react-navigation/native'
import {Input, Label, InputContainer, Button, black, white, gray} from '../../theme'
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
import {useEffect} from 'react'
const Login = () => {
  const navigation = useNavigation()
  const [result, setResult] = useState<string>('')

  const onPressFindId = useCallback(() => {
    navigation.navigate('FindId')
  }, [])

  const onPressFindPassword = useCallback(() => {
    navigation.navigate('FindPassword')
  }, [])

  const onPressCreateAccount = useCallback(() => {
    navigation.navigate('CreateAccount')
  }, [])

  const onPresssLogin = useCallback(() => {
    navigation.navigate('MainTabNavigator')
  }, [])

  const onPressTwitterLogin = useCallback(() => {
    // do something
  }, [])

  const onPressKakaoLogin = useCallback(() => {
    // do something
  }, [])

  const onPressNaverLogin = useCallback(() => {
    // do something
  }, [])

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

  useEffect(() => {
    console.log(result)
  }, [result])

  return (
    <View style={[styles.container]}>
      <View style={[styles.localLoginContainer]}>
        <InputContainer>
          <Label>이메일</Label>
          <Input placeholder="이메일을 입력해주세요" placeholderTextColor={gray} />
        </InputContainer>

        <InputContainer>
          <Label>비밀번호</Label>
          <Input placeholder="비밀번호를 입력해주세요" placeholderTextColor={gray} />
        </InputContainer>

        <View style={[styles.checkBoxContainer]}>
          <BouncyCheckbox
            size={18}
            fillColor={black}
            unfillColor={white}
            iconStyle={[styles.iconStyle]}
            text="자동 로그인"
            textStyle={{textDecorationLine: 'none', fontSize: 13}}
            textContainerStyle={{marginLeft: 10}}
            onPress={(isChecked: boolean) => {}}
          />
        </View>

        <Button style={[styles.loginButton]} onPress={onPresssLogin}>
          <Text style={[styles.loginText]}>로그인</Text>
        </Button>

        <View style={[styles.loginEtcContainer]}>
          <TouchableOpacity onPress={onPressFindId}>
            <Text style={[styles.loginEtcText]}>아이디 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressFindPassword}>
            <Text style={[styles.loginEtcText]}>비밀번호 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressCreateAccount}>
            <Text style={[styles.loginEtcText]}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.socialLoginContainer]}>
        <TouchableOpacity style={[styles.socialLoginButton]} onPress={onPressTwitterLogin}>
          <Text style={[styles.socialLoginText]}>트위터 로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.socialLoginButton]} onPress={() => signInWithKakao()}>
          <Text style={[styles.socialLoginText]}>카카오 로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.socialLoginButton]} onPress={onPressNaverLogin}>
          <Text style={[styles.socialLoginText]}>애플 로그인</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  localLoginContainer: {
    width: '100%',
    alignItems: 'center',
  },
  socialLoginText: {
    color: black,
  },
  socialLoginButton: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: black,
    borderRadius: 8,
    marginVertical: 5,
  },
  socialLoginContainer: {
    marginTop: 80,
    width: '100%',
  },
  loginEtcText: {
    color: black,
    fontSize: 13,
  },
  loginEtcContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    justifyContent: 'space-between',
  },
  iconStyle: {
    borderRadius: 4,
    borderColor: black,
  },
  checkBoxContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  loginButton: {
    backgroundColor: black,
    height: 50,
    marginVertical: 10,
    width: '100%',
  },
  loginText: {
    color: white,
  },

  container: {
    flex: 1,
    backgroundColor: white,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
