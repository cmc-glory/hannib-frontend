import React, {useState, useMemo, useCallback} from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {getStatusBarHeight} from 'react-native-status-bar-height'
import {isIphoneX, getBottomSpace} from 'react-native-iphone-x-helper'

import {StepIndicator} from '../../components/WriteGoodsStack'
import {StackHeader, CompleteIcon, RoundButton} from '../../components/utils'
import * as theme from '../../theme'

export const GoodsRequestComplete = () => {
  const navigation = useNavigation()
  const [height, setHeight] = useState<number>(0)
  const MARGIN_TOP = useMemo(() => {
    const status = getStatusBarHeight()
    if (isIphoneX()) {
      return (Dimensions.get('window').height - status - getBottomSpace() - height) / 2 - 56
    } else {
      return (Dimensions.get('window').height - status - height) / 2 - 56
    }
  }, [height])

  const onPressButton = useCallback(() => {
    navigation.navigate('GoodsDetail')
  }, [])
  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader title="신청하기" goBack />

      <View style={{paddingHorizontal: theme.PADDING_SIZE}}>
        <StepIndicator step={3} />
        <View
          style={[styles.container, {top: MARGIN_TOP}]}
          onLayout={e => {
            setHeight(e.nativeEvent.layout.height)
          }}>
          <CompleteIcon />
          <View style={{marginVertical: 32, alignItems: 'center'}}>
            <Text style={[theme.styles.bold20, {marginBottom: 8}]}>모집글 등록 완료</Text>
            <Text style={{color: theme.gray700, fontSize: 16}}>모집글 작성이 완료됐습니다.</Text>
            <Text style={{color: theme.gray700, fontSize: 16}}>게시글이 잘 등록됐는지 확인해보세요!</Text>
          </View>
          <RoundButton label="등록한 게시글로 이동" style={{alignSelf: 'stretch'}} enabled onPress={onPressButton} />
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
  image: {
    width: 53,
    height: 53,
  },
})
