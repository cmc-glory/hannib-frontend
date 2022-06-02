import React, {useState} from 'react'
import {View, ScrollView, Text, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import type {Asset} from 'react-native-image-picker'

import StackHeader from '../../components/utils/StackHeader'
import StepIndicator from '../../components/WriteGoodsStack/StepIndicator'
import ImagePicker from '../../components/WriteGoodsStack/ImagePicker'
import {NextButton, SelectCategory} from '../../components/WriteGoodsStack'
import {InputContainer, Label, Input, Button, black} from '../../theme'

export const WriteGoodsDefault = () => {
  const [images, setImages] = useState<Asset[]>([])
  const [type, setType] = useState('')
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
            <Button style={styles.button} onPress={() => setType('online')}>
              <Text style={{color: black}}>우편</Text>
            </Button>
            <Button style={styles.button} onPress={() => setType('offline')}>
              <Text style={{color: black}}>오프라인</Text>
            </Button>
          </View>
        </InputContainer>
      </ScrollView>
      <NextButton to={type == 'online' ? 'WriteGoodsOnline' : 'WriteGoodsOffline'} />
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
