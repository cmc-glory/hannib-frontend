import React, {useState, useCallback} from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import type {Asset} from 'react-native-image-picker'
import {useNavigation} from '@react-navigation/native'

import StackHeader from '../../components/utils/StackHeader'
import {SelectCategory, ImagePicker, StepIndicator, HashTag, SetSharingType} from '../../components/WriteGoodsStack'
import {FloatingBottomButton} from '../../components/utils'
import type {IHashtag, ISharingType} from '../../types'
import * as theme from '../../theme'
import {useAutoFocus, AutoFocusProvider} from '../../contexts'

export const WriteGoodsDefault = () => {
  const navigation = useNavigation()
  const focus = useAutoFocus()
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
      {/* <ScrollView style={[styles.container]}> */}
      <AutoFocusProvider contentContainerStyle={[theme.styles.wrapper]}>
        <StepIndicator step={1} />

        <ImagePicker images={images} setImages={setImages} />
        <SelectCategory />
        <View style={[styles.itemWrapper]}>
          <Text style={[styles.label]}>제목</Text>
          <TextInput style={theme.styles.input} onFocus={focus} placeholder="제목 입력" placeholderTextColor={theme.gray300} />
        </View>
        <View style={[styles.itemWrapper]}>
          <Text style={[styles.label]}>내용</Text>
          <TextInput
            multiline={true}
            onFocus={focus}
            style={[theme.styles.input, {height: 150}]}
            placeholder="내용 입력"
            placeholderTextColor={theme.gray300}
          />
        </View>
        <View style={[styles.itemWrapper]}>
          <Text style={[styles.label]}>해시태그</Text>
          <HashTag hashtags={hashtags} setHashtags={setHashtags} />
        </View>
        <View style={[styles.itemWrapper]}>
          <Text style={[styles.label]}>나눔 방식</Text>
          <SetSharingType type={type} setType={setType} />
        </View>
        {/* </ScrollView> */}
      </AutoFocusProvider>
      <FloatingBottomButton label="다음" onPress={type == 'offline' ? onPressOffline : onPressOnline} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  itemWrapper: {
    marginBottom: 16,
  },
  keyboardAwareFocus: {
    //flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  label: {
    marginBottom: 8,
  },
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  button: {
    borderColor: theme.black,
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
