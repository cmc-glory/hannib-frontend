import 'react-native-gesture-handler'
import React, {useEffect, useCallback} from 'react'
import {Alert} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {NavigationContainer} from '@react-navigation/native'
import messaging from '@react-native-firebase/messaging'
import {setCustomText} from 'react-native-global-props'
import {GoogleSignin} from '@react-native-google-signin/google-signin'
import {gray800} from './src/theme'
import RootStackNavigtor from './src/navigation/RootStackNavigator'
import MainTabNavigator from './src/navigation/MainTabNavigator'
import {store} from './src/redux/store'
import {Provider as ReduxProvider} from 'react-redux'
import NetInfo from '@react-native-community/netinfo'

// 권한 설정이 필요한 곳에 넣으면 됨.
// 현재는 테스트를 위해 첫 페이지에 넣음.
async function requestUserPermission() {
  // authStatus 0 : 거절, 1 : 승인, 2 : 잠정적 승인
  const authStatus = await messaging().requestPermission()
  const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL

  if (enabled) {
    console.log('Authorization status:', authStatus)
  }
}

const customTextProps = {
  style: {
    fontFamily: 'Pretendard-Regular',
    color: gray800,
  },
}

const App = () => {
  // internet checking
  const unsubscribe = useCallback(
    () =>
      NetInfo.addEventListener(state => {
        if (!state.isConnected) {
          Alert.alert('인터넷을 확인해주세요')
        }
      }),
    [],
  )

  const googleSigninConfigure = useCallback(() => {
    GoogleSignin.configure({
      webClientId: '10776992039-a2u306icmbug1iivc4p3nekco3055rjf.apps.googleusercontent.com',
    })
  }, [])
  useEffect(() => {
    // 기본 폰트를 pretendard로 지정
    setCustomText(customTextProps)

    // 구글 로그인 설정
    googleSigninConfigure()
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage))
    })

    // 알림 허용 설정 요청
    requestUserPermission()
    return unsubscribe
  }, [])

  unsubscribe()

  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider style={{flex: 1, backgroundColor: 'white'}}>
        <NavigationContainer>
          <RootStackNavigtor />
        </NavigationContainer>
      </SafeAreaProvider>
    </ReduxProvider>
  )
}

export default App
