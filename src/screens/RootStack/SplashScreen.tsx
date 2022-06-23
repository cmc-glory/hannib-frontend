import React, {useEffect} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import * as theme from '../../theme'
import {getString} from '../../hooks'
import {storeAccessToken, login} from '../../redux/slices'
import {useAppSelector, useAppDispatch} from '../../hooks'

export const SplashScreen = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  useEffect(() => {
    getString('accessToken').then(accessToken => {
      console.log('accessToken :', accessToken)
      if (accessToken == null) {
        navigation.navigate('LoginStackNavigator')
      } else {
        //dispatch(storeAccessToken(accessToken)) // redux에 accesss
        // accessToken으로 id, email, 카테고리 저장
        navigation.navigate('MainTabNavigator')
      }
    })
  }, [])
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
