import React, {useState, useCallback, useRef, useMemo} from 'react'
import {View, Text, ScrollView, TextInput, StyleSheet, Pressable, Dimensions, Platform} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation} from '@react-navigation/native'
import KeyboardManager from 'react-native-keyboard-manager'
import BottomSheet, {BottomSheetBackdrop, BottomSheetView, BottomSheetScrollView} from '@gorhom/bottom-sheet'
import {isIphoneX} from 'react-native-iphone-x-helper'
import StackHeader from '../../components/utils/StackHeader'
import {ImagePicker, StepIndicator, SetSharingType, BookSharingDate, SelectCategory} from '../../components/WriteGoodsStack'
import {NeccesaryField, RightArrowIcon, RoundButton, XIcon} from '../../components/utils'
import {useToggle} from '../../hooks'
import type {INanumMethod} from '../../types'
import * as theme from '../../theme'

const iosX = isIphoneX()

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

export const WriteNanumFormDefault = () => {
  // ***************************** utils *****************************

  const navigation = useNavigation()
  const bottomSheetRef = useRef<BottomSheet>(null)

  // variables
  const snapPoints = useMemo(() => ['95%'], [])

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index)
  }, [])

  // ***************************** states *****************************
  const [categoryModalOpened, setCategoryModalOpened] = useState<boolean>(false)
  const [images, setImages] = useState<string[]>([]) // 대표 이미지
  const [category, setCategory] = useState<{category: string; job: '가수' | '배우'}>({category: '', job: '가수'}) // 카테고리
  const [title, setTitle] = useState<string>('') // 제목
  const [contents, setContents] = useState<string>('') // 내용
  const [nanumMethod, setNanumMethod] = useState<INanumMethod>('M') // 나눔 방식
  const [isOpenDateBooked, toggleOpenDate] = useToggle() // 나눔 시작일 예약 여부
  const [firstDate, setFirstDate] = useState<Date>(new Date()) // 나눔 시작일. 기본은 오늘

  // ***************************** callbacks *****************************
  const onPressSelectCategory = useCallback(() => {
    setCategoryModalOpened(categoryModalOpened => !categoryModalOpened)
  }, [])

  // 모든 state가 바뀔때마다 새로 만들어져야 하므로 dependency (X)
  const onPressOffline = () => {
    navigation.navigate('WriteNanumFormOffline', {
      images,
      category,
      title,
      contents,
      nanumMethod,
      firstDate,
    })
  }

  // 모든 state가 바뀔때마다 새로 만들어져야 하므로 dependency (X)
  const onPressOnline = () => {
    navigation.navigate('WriteNanumFormOnline', {
      images,
      category,
      title,
      contents,
      nanumMethod,
      firstDate,
    })
  }

  // 필요한 내용을 기입해서 다음으로 넘어갈 수 있는지.
  const checkNextButtonEnabled = useCallback(() => {
    if (images.length != 0 && category.category != '' && title != '' && contents != '') {
      return true
    } else {
      return false
    }
  }, [images, category, title, contents])

  // renders
  const renderBackdrop = useCallback((props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />, [])

  const handleClosePress = useCallback(() => {
    categoryModalOpened ? bottomSheetRef.current?.close() : bottomSheetRef.current?.expand()
  }, [])

  return (
    <SafeAreaView edges={['top', 'bottom']} style={theme.styles.safeareaview}>
      <StackHeader goBack title="모집폼 작성" />

      <ScrollView contentContainerStyle={[theme.styles.wrapper]}>
        <StepIndicator step={1} />

        <ImagePicker images={images} setImages={setImages} />
        <View style={[theme.styles.rowSpaceBetween, {marginBottom: 16}]}>
          <View style={[theme.styles.rowFlexStart]}>
            <Text style={[theme.styles.label]}>카테고리</Text>
            <NeccesaryField />
          </View>

          <View style={[theme.styles.rowFlexStart]}>
            {category.category != '' && (
              <View
                style={{
                  backgroundColor: theme.secondary,
                  width: 24,
                  height: 24,
                  borderRadius: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 8,
                }}>
                <Text style={{color: theme.white, fontFamily: 'Pretendard-Medium'}}>1</Text>
              </View>
            )}
            <Pressable style={styles.selectContainer} onPress={handleClosePress}>
              <RightArrowIcon onPress={handleClosePress} />
            </Pressable>
          </View>
        </View>
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
            value={contents}
            onChangeText={setContents}
          />
        </View>

        <View style={[styles.itemWrapper]}>
          <View style={[theme.styles.rowFlexStart]}>
            <Text style={[theme.styles.label]}>나눔 방식</Text>
            <NeccesaryField />
          </View>

          <SetSharingType type={nanumMethod} setType={setNanumMethod} />
        </View>
        <BookSharingDate isOpenDateBooked={isOpenDateBooked} toggleOpenDate={toggleOpenDate} firstDate={firstDate} setFirstDate={setFirstDate} />
      </ScrollView>
      <View style={{paddingHorizontal: theme.PADDING_SIZE}}>
        <RoundButton
          label="다음"
          onPress={nanumMethod == 'O' ? onPressOffline : onPressOnline}
          enabled={checkNextButtonEnabled()}
          style={{marginBottom: iosX ? 0 : 10}}
        />
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        handleStyle={{padding: 0}}
        handleIndicatorStyle={{height: 0, padding: 0}}
        enablePanDownToClose={true}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        detached={true}
        bottomInset={0}
        backdropComponent={renderBackdrop}>
        <BottomSheetView style={{flex: 1}}>
          <View style={[{alignItems: 'flex-end'}]}>
            <XIcon
              style={{padding: 16}}
              onPress={() => {
                bottomSheetRef.current?.close()
              }}
            />
          </View>
          <SelectCategory category={category} setCategory={setCategory} bottomSheetRef={bottomSheetRef} />
        </BottomSheetView>
      </BottomSheet>
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
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
  },
})
