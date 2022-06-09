import React, {useState, useCallback} from 'react'
import {View, ScrollView, Text, TextInput, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import type {Asset} from 'react-native-image-picker'
import {useNavigation} from '@react-navigation/native'

import StackHeader from '../../components/utils/StackHeader'
import {SelectCategory, ImagePicker, StepIndicator, HashTag, SetSharingType} from '../../components/WriteGoodsStack'
import {NextButton, FloatingBottomButton} from '../../components/utils'
import type {IHashtag, ISharingType} from '../../types'
import {InputContainer, Label, Input, Button, black, white, styles as s} from '../../theme'

export const WriteGoodsDefault = () => {
  const navigation = useNavigation()
  const [images, setImages] = useState<Asset[]>([])
  const [type, setType] = useState<ISharingType>('online')
  const [hashtags, setHashtags] = useState<IHashtag[]>([])

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
          <Text style={[s.bold16, styles.label]}>제목</Text>
          <TextInput style={s.input} />
        </InputContainer>
        <InputContainer>
          <Text style={[s.bold16, styles.label]}>내용</Text>
          <TextInput multiline={true} style={[s.input, {height: 100}]} />
        </InputContainer>
        <InputContainer>
          <Text style={[s.bold16, styles.label]}>해시태그</Text>
          <HashTag hashtags={hashtags} setHashtags={setHashtags} />
        </InputContainer>
        <InputContainer>
          <Text style={[s.bold16, styles.label]}>나눔 방식</Text>
          <SetSharingType type={type} setType={setType} />
          {/* <View style={styles.buttons}>
            <Button style={[styles.button, {backgroundColor: type == 'WriteGoodsOnline' ? black : white}]} onPress={() => setType('WriteGoodsOnline')}>
              <Text style={{color: type == 'WriteGoodsOnline' ? white : black}}>우편</Text>
            </Button>
            <Button style={[styles.button, , {backgroundColor: type == 'WriteGoodsOffline' ? black : white}]} onPress={() => setType('WriteGoodsOffline')}>
              <Text style={{color: type == 'WriteGoodsOffline' ? white : black}}>오프라인</Text>
            </Button>
          </View> */}
        </InputContainer>
      </ScrollView>
      <FloatingBottomButton label="다음" onPress={type == 'offline' ? onPressOffline : onPressOnline} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 10,
  },
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
