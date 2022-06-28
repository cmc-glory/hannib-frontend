import React, {useState, useMemo, useCallback} from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper'
import type {NativeStackNavigationProp} from '@react-navigation/native-stack'
import {useNavigation} from '@react-navigation/native'
import {StackHeader, RoundButton, CompleteIcon} from '../../components/utils'
import * as theme from '../../theme'

export const AskAddStarComplete = () => {
  const [height, setHeight] = useState<number>(0)

  const MARGIN_TOP = useMemo(() => {
    const status = getStatusBarHeight()
    if (isIphoneX()) {
      return (Dimensions.get('window').height - status - getBottomSpace() - height) / 2
    } else {
      return (Dimensions.get('window').height - status - height) / 2
    }
  }, [height])

  const navigation = useNavigation<NativeStackNavigationProp<any>>()
  const onPressNext = useCallback(() => {
    navigation.pop(2)
  }, [])
  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader title="문의하기" goBack />
      <View style={[styles.container, {top: MARGIN_TOP}]}>
        <View
          onLayout={e => {
            setHeight(e.nativeEvent.layout.height)
          }}>
          <CompleteIcon style={{alignSelf: 'center'}} />
          <View style={{marginVertical: 32, alignItems: 'center'}}>
            <Text style={[theme.styles.bold20, {marginBottom: 8}]}>문의하기 등록 완료</Text>
            <Text style={{fontSize: 16, color: theme.gray700, textAlign: 'center'}}>
              기존 카테고리 내에 중복확인 후, 결과를 이메일로 전달해 드리겠습니다. 감사합니다.
            </Text>
          </View>
          <RoundButton label="카테고리로 이동" enabled onPress={onPressNext} />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    paddingHorizontal: theme.PADDING_SIZE,
  },
})
