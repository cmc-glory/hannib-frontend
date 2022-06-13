import React, {useCallback, useState} from 'react'
import {View, Text, TextInput, ScrollView, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Switch} from 'react-native-paper'
import {useNavigation} from '@react-navigation/native'
import {StackHeader, FloatingBottomButton} from '../../components/utils'
import {StepIndicator, GoodsInput, AdditionalQuestions, ProductInfo} from '../../components/WriteGoodsStack'
import * as theme from '../../theme'
import {useToggle} from '../../hooks/useToggle'
import {IProductInfo} from '../../types'

export const WriteGoodsOnline = () => {
  const navigation = useNavigation()
  const onPressNext = useCallback(() => {
    navigation.navigate('WriteGoodsComplete')
  }, [])
  const [addressEditable, toggleAddressEditable] = useToggle(false) // 주소 정보 수정 여부
  const [quantityLimit, setQuantityLimit] = useToggle(false) // 인당 수량 제한 여부
  const [secretForm, toggleSecretForm] = useToggle(false) // 시크릿 폼 여부

  const [productInfos, setProductInfos] = useState<IProductInfo[]>([]) // 상품 정보 state
  const [addtionalQuestions, setAdditionalQuestions] = useState<string[]>([]) // 추가 질문 사항 state
  const [secretPassword, setSecretPassword] = useState('')

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <StackHeader goBack title="모집폼 작성" />
      <ScrollView style={[styles.container]}>
        <View style={[theme.styles.wrapper]}>
          <StepIndicator step={2} />
        </View>

        <View style={[theme.styles.wrapper, styles.spacing]}>
          <ProductInfo productInfos={productInfos} setProductInfos={setProductInfos} quantityLimit={quantityLimit} setQuantityLimit={setQuantityLimit} />
        </View>
        <View style={[theme.styles.wrapper, styles.spacing]}>
          <Text>추가 질문 사항</Text>
          <AdditionalQuestions />
        </View>

        <View style={[theme.styles.wrapper, styles.spacing]}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <Text>시크릿 폼</Text>
            <Switch color={theme.gray800} onValueChange={toggleSecretForm} value={secretForm} style={styles.switch} />
          </View>
          <TextInput
            style={[theme.styles.input, styles.input]}
            value={secretPassword}
            onChangeText={setSecretPassword}
            placeholder="비밀번호를 입력하세요"
            placeholderTextColor={theme.gray300}
          />
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
  spacing: {
    marginBottom: 16,
  },
})
