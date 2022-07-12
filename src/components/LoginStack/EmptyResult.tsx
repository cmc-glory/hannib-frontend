import React, {useCallback, useState, useMemo} from 'react'
import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import {getBottomSpace} from 'react-native-iphone-x-helper'
import {useNavigation} from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import * as theme from '../../theme'
import NotExistsSvg from '../../assets/Icon/NotExists.svg'

export const EmptyResult = () => {
  // ******************** utils  ********************
  // ******************** utils  ********************
  const navigation = useNavigation()

  // ******************** callbacks  ********************
  const onPressAsk = useCallback(() => {
    navigation.navigate('AskAddStar')
  }, [])
  return (
    <View style={[styles.container]}>
      <NotExistsSvg width={53} height={53} />
      <View style={{marginVertical: 32, alignItems: 'center'}}>
        <Text style={[theme.styles.bold20, {marginBottom: 8}]}>검색 결과가 존재하지 않습니다</Text>
        <Text style={{fontSize: 16, color: theme.gray700}}>원하는 카테고리가 없으시다면,</Text>
        <Text style={{fontSize: 16, color: theme.gray700}}>문의하기를 통해 추가가 가능합니다. </Text>
      </View>
      <Pressable style={[styles.button]} onPress={onPressAsk}>
        <Text style={{fontSize: 16}}>카테고리 문의하기</Text>
      </Pressable>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    marginVertical: 10,
  },
  button: {
    borderColor: theme.gray800,
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 14,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  notExists: {
    width: 53,
    height: 53,
  },
})
