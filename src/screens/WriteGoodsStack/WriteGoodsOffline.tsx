import React, {useCallback, useState} from 'react'
import {View, Text, TextInput, ScrollView, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Switch} from 'react-native-paper'

import StackHeader from '../../components/utils/StackHeader'
import {StepIndicator, NextButton, DatePicker, GoodsInput, AdditionalQuestions} from '../../components/WriteGoodsStack'
import {styles as s, black} from '../../theme'

export const WriteGoodsOffline = () => {
  const onPressNext = useCallback(() => {}, [])
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <StackHeader goBack title="모집폼 작성" />
      <ScrollView style={[styles.container]}>
        <View style={[s.wrapper]}>
          <StepIndicator step={2} />
        </View>
        <View style={[s.wrapper]}>
          <Text style={[s.label]}>수령일 선택</Text>
          <DatePicker />
        </View>
        <View style={[s.wrapper]}>
          <Text style={[s.label]}>상품 정보</Text>
          <GoodsInput />
        </View>
        <View style={[s.wrapper]}>
          <Text style={[s.label]}>추가 질문 사항</Text>
          <AdditionalQuestions />
        </View>

        <View style={[s.wrapper]}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={[s.label]}>시크릿 폼</Text>
            <Switch color={black} onValueChange={toggleSwitch} value={isEnabled} style={styles.switch} />
          </View>
          <TextInput style={s.input} />
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
  switch: {
    marginBottom: 10,
  },
})
