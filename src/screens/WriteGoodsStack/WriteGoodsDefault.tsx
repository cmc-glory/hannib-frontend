import React, {useState, useCallback} from 'react'
import {View, ScrollView, Text, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import type {Asset} from 'react-native-image-picker'
import {useNavigation} from '@react-navigation/native'

import StackHeader from '../../components/utils/StackHeader'
import {SelectCategory, ImagePicker, StepIndicator} from '../../components/WriteGoodsStack'
import {NextButton} from '../../components/utils/NextButton'
import {InputContainer, Label, Input, Button, black, white} from '../../theme'

export const WriteGoodsDefault = () => {
  const navigation = useNavigation()
  const [images, setImages] = useState<Asset[]>([])
  const [type, setType] = useState<'WriteGoodsOffline' | 'WriteGoodsOnline' | ''>('')

  const onPressOffline = useCallback(() => {
    navigation.navigate('WriteGoodsOffline')
  }, [])
  const onPressOnline = useCallback(() => {
    navigation.navigate('WriteGoodsOnline')
  }, [])

  return (
    <SafeAreaView edges={['top', 'bottom']} style={{backgroundColor: '#fff', flex: 1}}>
      <StackHeader goBack title="모집폼 작성" />
      <ScrollView style={[styles.container]}>
        <StepIndicator step={1} />
        <ImagePicker images={images} setImages={setImages} />
        <SelectCategory />
        <InputContainer>
          <Label>제목</Label>
          <Input />
        </InputContainer>
        <InputContainer>
          <Label>내용</Label>
          <Input />
        </InputContainer>
        <InputContainer>
          <Label>해시태그</Label>
          <Input />
        </InputContainer>
        <InputContainer>
          <Label>나눔 방식</Label>
          <View style={styles.buttons}>
            <Button style={[styles.button, {backgroundColor: type == 'WriteGoodsOnline' ? black : white}]} onPress={() => setType('WriteGoodsOnline')}>
              <Text style={{color: type == 'WriteGoodsOnline' ? white : black}}>우편</Text>
            </Button>
            <Button style={[styles.button, , {backgroundColor: type == 'WriteGoodsOffline' ? black : white}]} onPress={() => setType('WriteGoodsOffline')}>
              <Text style={{color: type == 'WriteGoodsOffline' ? white : black}}>오프라인</Text>
            </Button>
          </View>
        </InputContainer>
      </ScrollView>
      <NextButton text="다음" onPressNext={type == 'WriteGoodsOffline' ? onPressOffline : onPressOnline} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  button: {
    borderColor: black,
    borderWidth: 0.75,
    height: 40,
    width: '49%',
  },
  buttons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
})
