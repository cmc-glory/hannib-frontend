import React, {useCallback} from 'react'
import {View, Text, ScrollView, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

import StackHeader from '../../components/utils/StackHeader'
import {StepIndicator, NextButton} from '../../components/WriteGoodsStack'
import {styles as s} from '../../theme'

export const WriteGoodsOffline = () => {
  const onPressNext = useCallback(() => {}, [])
  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <StackHeader goBack title="모집폼 작성" />
      <ScrollView style={[styles.container]}>
        <View style={[s.wrapper]}>
          <StepIndicator step={2} />
        </View>
        <View style={[s.wrapper]}>
          <Text style={[s.label]}>수령일 선택</Text>
        </View>
        <View style={[s.wrapper]}>
          <Text style={[s.label]}>상품 정보</Text>
        </View>
        <View style={[s.wrapper]}>
          <Text style={[s.label]}>추가 질문 사항</Text>
        </View>

        <View style={[s.wrapper]}>
          <Text style={[s.label]}>시크릿 폼</Text>
        </View>
      </ScrollView>
      <NextButton onPressNext={onPressNext} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
})
