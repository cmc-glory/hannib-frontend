import React, {useCallback, useMemo, useState} from 'react'
import {View, Text, TextInput, ScrollView, StyleSheet, Platform} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Switch} from 'react-native-paper'
import KeyboardManager from 'react-native-keyboard-manager'

import {useNavigation, useRoute} from '@react-navigation/native'
import {useToggle} from '../../hooks'
import {WriteNanumFormOfflineRouteProps, WriteNanumFormOfflineNavigationProps} from '../../navigation/WriteNanumFormStackNavigator'
import {StackHeader, FloatingBottomButton} from '../../components/utils'
import {StepIndicator, NanumGoodsInfo, NanumAsks, SelectTimeLocation} from '../../components/WriteGoodsStack'
import * as theme from '../../theme'
import {INanumAskInfo, INanumGoodsInfo, INanumDateInfo} from '../../types'

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

export const WriteNanumFormOffline = () => {
  // ***************************** utils *****************************
  const navigation = useNavigation<WriteNanumFormOfflineNavigationProps>()
  const route = useRoute<WriteNanumFormOfflineRouteProps>()
  const {images, category, title, contents, nanumMethod, firstDate} = useMemo(() => {
    return route.params
  }, [])

  // ***************************** states *****************************
  const [secretForm, toggleSecretForm] = useToggle(false) // 시크릿 폼 여부
  const [nanumAsks, setNanumAsks] = useState<INanumAskInfo[]>([])
  const [nanumGoods, setNanumGoods] = useState<INanumGoodsInfo[]>([]) // 상품 정보 state
  const [secretPwd, setSecretPwd] = useState('')
  const [nanumDates, setNanumDates] = useState<INanumDateInfo[]>([])

  // 처음에 화면 로드될 때 이전 페이지 작성 정보 가져옴

  // ***************************** callbacks *****************************
  const isButtonEnabled = useCallback(() => {
    if (nanumDates.length == 0 || nanumGoods.length == 0) {
      return false
    }
    return true
  }, [nanumDates, nanumGoods])

  const onPressNext = useCallback(() => {
    // 백에 전송할 나눔글 폼
    // const form: ISharingForm = {
    //   images,
    //   categories,
    //   title,
    //   content,
    //   //hashtags,
    //   type,
    //   isOpenDateBooked,
    //   openDate,
    //   isSecretForm,
    //   additionalQuestions,
    //   products,
    //   secretKey,
    //   nanumDates,
    // }
    // // ************* 여기에 api 작성 *************
    // // 백에서 받아온 게시글 id를 다음 스크린으로 넘겨줌.
    navigation.navigate('WriteNanumFormComplete', {
      nanumIdx: 11111,
    })
  }, [secretForm, nanumAsks, nanumGoods, secretPwd])

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <StackHeader goBack title="모집폼 작성" />
      <ScrollView style={[styles.container]}>
        <View style={[theme.styles.wrapper]}>
          <StepIndicator step={2} />
        </View>
        <View style={[theme.styles.wrapper, styles.spacing]}>
          <SelectTimeLocation nanumDates={nanumDates} setNanumDates={setNanumDates} />
        </View>

        <View style={[theme.styles.wrapper, styles.spacing]}>
          <NanumGoodsInfo nanumGoodsInfos={nanumGoods} setNanumGoodsInfos={setNanumGoods} />
        </View>
        <View style={[theme.styles.wrapper, styles.spacing]}>
          <NanumAsks questions={nanumAsks} setQuestions={setNanumAsks} />
        </View>

        <View style={[theme.styles.wrapper, styles.spacing]}>
          <View style={[theme.styles.rowSpaceBetween]}>
            <Text style={{fontFamily: 'Pretendard-Medium', fontSize: 16}}>시크릿 폼</Text>
            <Switch color={theme.gray800} onValueChange={toggleSecretForm} value={secretForm} />
          </View>
          <TextInput
            style={[theme.styles.input, {marginTop: 10}]}
            value={secretPwd}
            onChangeText={setSecretPwd}
            placeholder="비밀번호를 입력하세요"
            placeholderTextColor={theme.gray300}
          />
        </View>
      </ScrollView>
      <FloatingBottomButton enabled={isButtonEnabled()} label="다음" onPress={onPressNext} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },

  spacing: {
    marginBottom: 24,
  },
})
