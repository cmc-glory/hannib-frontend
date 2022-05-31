import 'react-native-gesture-handler'
import React, {useEffect} from 'react'
import {Alert} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {NavigationContainer} from '@react-navigation/native'
import messaging from '@react-native-firebase/messaging'

import MainTabNavigator from './src/navigation/MainTabNavigator'
import RootStackNavigtor from './src/navigation/RootStackNavigator'

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

const App = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage))
    })

    requestUserPermission()
    return unsubscribe
  }, [])

  return (
    <SafeAreaProvider style={{flex: 1, backgroundColor: 'white'}}>
      <NavigationContainer>
        <RootStackNavigtor />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App
