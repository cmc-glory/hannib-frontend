import React, {useState, useCallback} from 'react'
import {View, Text, ScrollView, TextInput, StyleSheet, Platform} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import type {Asset} from 'react-native-image-picker'
import {useNavigation} from '@react-navigation/native'
import KeyboardManager from 'react-native-keyboard-manager'

import StackHeader from '../../components/utils/StackHeader'
import {SelectCategory, ImagePicker, StepIndicator, SetSharingType, BookSharingDate} from '../../components/WriteGoodsStack'
import {FloatingBottomButton, NeccesaryField} from '../../components/utils'
import {useToggle} from '../../hooks'
import type {IHashtag, ISharingType} from '../../types'
import * as theme from '../../theme'
import {useAutoFocus, AutoFocusProvider} from '../../contexts'

// ***************************** ios keyboard settings *****************************
if (Platform.OS === 'ios') {
  KeyboardManager.setEnable(true)
  KeyboardManager.setEnableDebugging(false)
  KeyboardManager.setKeyboardDistanceFromTextField(10)
  KeyboardManager.setLayoutIfNeededOnUpdate(true)
  KeyboardManager.setEnableAutoToolbar(true)
  KeyboardManager.setToolbarDoneBarButtonItemText('확인')
  KeyboardManager.setToolbarManageBehaviourBy('subviews') // "subviews" | "tag" | "position"
  KeyboardManager.setToolbarPreviousNextButtonEnable(false)
  KeyboardManager.setToolbarTintColor('#007aff') // Only #000000 format is supported
  KeyboardManager.setToolbarBarTintColor('#FFFFFF') // Only #000000 format is supported
  KeyboardManager.setShouldShowToolbarPlaceholder(true)
  KeyboardManager.setOverrideKeyboardAppearance(false)
  KeyboardManager.setKeyboardAppearance('default') // "default" | "light" | "dark"
  KeyboardManager.setShouldResignOnTouchOutside(true)
  KeyboardManager.setShouldPlayInputClicks(true)
  KeyboardManager.resignFirstResponder()
}

export const EditGoodsDefault = () => {
  const navigation = useNavigation()

  const [images, setImages] = useState<Asset[]>([]) // 대표 이미지
  const [categories, setCategories] = useState<string[]>(['dd']) // 카테고리
  const [title, setTitle] = useState<string>('') // 제목
  const [content, setContent] = useState<string>('') // 내용
  const [type, setType] = useState<ISharingType>('online') // 나눔 방식
  const [isOpenDateBooked, toggleOpenDate] = useToggle() // 나눔 시작일 예약 여부
  const [openDate, setOpenDate] = useState<Date | undefined>() // 나눔 시작일

  console.log('images :', images)

  // 모든 state가 바뀔때마다 새로 만들어져야 하므로 dependency (X)
  const onPressOffline = () => {
    navigation.navigate('WriteGoodsOffline', {
      images: images,
      categories,
      title,
      content,
      type,
      isOpenDateBooked,
      openDate,
    })
  }

  // 모든 state가 바뀔때마다 새로 만들어져야 하므로 dependency (X)
  const onPressOnline = () => {
    navigation.navigate('WriteGoodsOnline', {
      images: images,
      categories,
      title,
      content,
      type,
      isOpenDateBooked,
      openDate,
    })
  }

  // 필요한 내용을 기입해서 다음으로 넘어갈 수 있는지.
  const checkNextButtonEnabled = () => {
    if (images.length != 0 && categories.length != 0 && title != '' && content != '') {
      return true
    } else {
      return false
    }
  }
  return (
    <SafeAreaView edges={['top', 'bottom']} style={theme.styles.safeareaview}>
      <StackHeader goBack title="모집폼 수정" />
      <ScrollView contentContainerStyle={[theme.styles.wrapper]}>
        <StepIndicator step={1} />
        <ImagePicker images={images} setImages={setImages} />
        <SelectCategory />
        <View style={[styles.itemWrapper]}>
          <View style={[theme.styles.rowFlexStart]}>
            <Text style={[theme.styles.label]}>제목</Text>
            <NeccesaryField />
          </View>

          <TextInput style={theme.styles.input} placeholder="제목 입력" placeholderTextColor={theme.gray300} value={title} onChangeText={setTitle} />
        </View>
        <View style={[styles.itemWrapper]}>
          <View style={[theme.styles.rowFlexStart]}>
            <Text style={[theme.styles.label]}>내용</Text>
            <NeccesaryField />
          </View>
          <TextInput
            multiline={true}
            style={[theme.styles.input, {height: 150, textAlignVertical: 'top', paddingTop: 16}]}
            placeholder="내용 입력"
            placeholderTextColor={theme.gray300}
            value={content}
            onChangeText={setContent}
          />
        </View>
        {/* <View style={[styles.itemWrapper]}>
          <Text style={[theme.styles.label]}>해시태그</Text>
          <HashTag hashtags={hashtags} setHashtags={setHashtags} />
        </View> */}
        <View style={[styles.itemWrapper]}>
          <View style={[theme.styles.rowFlexStart]}>
            <Text style={[theme.styles.label]}>나눔 방식</Text>
            <NeccesaryField />
          </View>

          <SetSharingType type={type} setType={setType} />
        </View>
        <BookSharingDate isOpenDateBooked={isOpenDateBooked} toggleOpenDate={toggleOpenDate} openDate={openDate} setOpenDate={setOpenDate} />
      </ScrollView>
      <FloatingBottomButton label="다음" onPress={type == 'offline' ? onPressOffline : onPressOnline} enabled={checkNextButtonEnabled()} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  itemWrapper: {
    marginBottom: 24,
  },
  keyboardAwareFocus: {
    //flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
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
