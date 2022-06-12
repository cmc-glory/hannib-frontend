import React, {useEffect} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import * as theme from '../../theme'
import {getString} from '../../hooks'
import {storeAccessToken} from '../../redux/slices'

export const SplashScreen = () => {
  const navigation = useNavigation()
  useEffect(() => {
    getString('accessToken').then(accessToken => {
      if (accessToken == null) {
        navigation.navigate('LoginStackNavigator')
      } else {
        storeAccessToken(accessToken)
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
