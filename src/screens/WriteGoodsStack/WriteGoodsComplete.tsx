import React, {useCallback} from 'react'
import {View, Text, Pressable, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'

import {StackHeader, RoundButton} from '../../components/utils'
import {StepIndicator} from '../../components/WriteGoodsStack'
import * as theme from '../../theme'

export const WriteGoodsComplete = () => {
  const navigation = useNavigation()
  const onPressButton = useCallback(() => {
    navigation.navigate('MainTabNavigator')
  }, [])
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StackHeader title="모집폼 작성" goBack />
      <View style={[theme.styles.wrapper, {flex: 1}]}>
        <StepIndicator step={3} />
        <View style={styles.container}>
          <View style={styles.illustration}></View>
          <View style={{marginVertical: 32, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[theme.styles.bold20, {marginBottom: 8}]}>모집글 등록 완료</Text>
            <Text style={{fontSize: 16, color: theme.gray700}}>모집글 등록이 완료됬습니다.</Text>
            <Text style={{fontSize: 16, color: theme.gray700}}>게시글이 잘 등록됬는지 확인해보세요!</Text>
          </View>
        </View>
        <RoundButton label="등록한 게시글로 이동" enabled onPress={onPressButton} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    width: '100%',
  },
  label: {
    color: theme.white,
    fontFamily: 'Pretendard-SemiBold',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  illustration: {
    position: 'relative',
    width: 240,
    height: 240,
    backgroundColor: theme.main50,
  },
})
