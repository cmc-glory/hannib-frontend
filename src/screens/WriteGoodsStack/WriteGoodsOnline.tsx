import React, {useCallback, useState} from 'react'
import {View, Text, TextInput, ScrollView, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Switch} from 'react-native-paper'
import {StackHeader, FloatingBottomButton} from '../../components/utils'
import {StepIndicator, GoodsInput, AdditionalQuestions} from '../../components/WriteGoodsStack'
import {styles as s, black, white} from '../../theme'
import {useToggle} from '../../hooks/useToggle'

export const WriteGoodsOnline = () => {
  const onPressNext = useCallback(() => {}, [])
  const [addressEditable, toggleAddressEditable] = useToggle(false)
  const [secretForm, toggleSecretForm] = useToggle(false)
  //const [secretForm, setSecretForm] = useState(false)

  // const toggleAddressEditable = useCallback(() => {
  //   setAddressEditable(addressEditable => !addressEditable)
  // }, [])

  // const toggleSecretForm = useCallback(() => {
  //   setSecretForm(secretForm => !secretForm)
  // }, [])

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <StackHeader goBack title="모집폼 작성" />
      <ScrollView style={[styles.container]}>
        <View style={[s.wrapper]}>
          <StepIndicator step={2} />
        </View>
        <View style={[s.wrapper]}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={[s.bold16]}>주소 정보 수정</Text>
            <Switch color={black} onValueChange={toggleAddressEditable} value={addressEditable} style={styles.switch} />
          </View>
        </View>
        <View style={[s.wrapper]}>
          <Text style={[s.bold16]}>상품 정보</Text>
          <GoodsInput />
        </View>
        <View style={[s.wrapper]}>
          <Text style={[s.bold16]}>추가 질문 사항</Text>
          <AdditionalQuestions />
        </View>

        <View style={[s.wrapper]}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text style={[s.bold16]}>시크릿 폼</Text>
            <Switch color={black} onValueChange={toggleSecretForm} value={secretForm} style={styles.switch} />
          </View>
          <TextInput style={[s.input, styles.input]} />
        </View>
      </ScrollView>
      <FloatingBottomButton label="다음" onPress={onPressNext} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  switch: {
    //marginBottom: 10,
  },
  input: {
    marginTop: 5,
  },
})
