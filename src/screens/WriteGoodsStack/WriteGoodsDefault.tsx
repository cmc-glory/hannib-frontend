import React, {useState, useCallback} from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import type {Asset} from 'react-native-image-picker'
import {useNavigation} from '@react-navigation/native'

import StackHeader from '../../components/utils/StackHeader'
import {SelectCategory, ImagePicker, StepIndicator, HashTag, SetSharingType, BookSharingDate} from '../../components/WriteGoodsStack'
import {FloatingBottomButton} from '../../components/utils'
import {useToggle} from '../../hooks'
import type {IHashtag, ISharingType, ISharingForm, IProductInfo} from '../../types'
import * as theme from '../../theme'
import {useAutoFocus, AutoFocusProvider} from '../../contexts'

export const WriteGoodsDefault = () => {
  const navigation = useNavigation()
  const focus = useAutoFocus()

  const [images, setImages] = useState<Asset[]>([]) // 대표 이미지
  const [categories, setCategories] = useState<string[]>(['dd']) // 카테고리
  const [title, setTitle] = useState<string>('') // 제목
  const [content, setContent] = useState<string>('') // 내용
  const [hashtags, setHashtags] = useState<IHashtag[]>([]) // 해시태그
  const [type, setType] = useState<ISharingType>('online') // 나눔 방식
  const [isOpenDateBooked, toggleOpenDate] = useToggle() // 나눔 시작일 예약 여부
  const [openDate, setOpenDate] = useState<Date | undefined>() // 나눔 시작일

  const onPressOffline = useCallback(() => {
    navigation.navigate('WriteGoodsOffline', {
      images,
      categories,
      title,
      content,
      hashtags: hashtags.map(item => item.content),
      type,
      isOpenDateBooked,
      openDate,
    })
  }, [])
  const onPressOnline = useCallback(
    () =>
      navigation.navigate('WriteGoodsOnline', {
        images,
        categories,
        title,
        content,
        hashtags: hashtags.map(item => item.content),
        type,
        isOpenDateBooked,
        openDate,
      }),
    [],
  )
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
      <StackHeader goBack title="모집폼 작성" />
      <AutoFocusProvider contentContainerStyle={[theme.styles.wrapper]}>
        <StepIndicator step={1} />
        <ImagePicker images={images} setImages={setImages} />
        <SelectCategory />
        <View style={[styles.itemWrapper]}>
          <Text style={[theme.styles.label]}>제목</Text>
          <TextInput
            style={theme.styles.input}
            onFocus={focus}
            placeholder="제목 입력"
            placeholderTextColor={theme.gray300}
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View style={[styles.itemWrapper]}>
          <Text style={[theme.styles.label]}>내용</Text>
          <TextInput
            multiline={true}
            onFocus={focus}
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
          <Text style={[theme.styles.label]}>나눔 방식</Text>
          <SetSharingType type={type} setType={setType} />
        </View>
        <BookSharingDate isOpenDateBooked={isOpenDateBooked} toggleOpenDate={toggleOpenDate} openDate={openDate} setOpenDate={setOpenDate} />
      </AutoFocusProvider>
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
