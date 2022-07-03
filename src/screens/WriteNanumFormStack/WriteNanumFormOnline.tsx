import React, {useCallback, useMemo, useState} from 'react'
import {View, Text, TextInput, ScrollView, StyleSheet, Platform} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Switch} from 'react-native-paper'
import {useNavigation, useRoute} from '@react-navigation/native'
import KeyboardManager from 'react-native-keyboard-manager'
import {useMutation} from 'react-query'
import {showMessage} from 'react-native-flash-message'

import {WriteNanumFormOnlineRouteProps} from '../../navigation/WriteNanumFormStackNavigator' // route props
import {IAdditionalQuestion, INanumGoodsInfo, INanumAskInfo} from '../../types' // types
import {StackHeader, FloatingBottomButton} from '../../components/utils' // components
import {StepIndicator, NanumAsks, NanumGoodsInfo} from '../../components/WriteGoodsStack' // components
import * as theme from '../../theme' // themes
import {useToggle} from '../../hooks' // hooks

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

export const WriteNanumFormOnline = () => {
  // ******************** utils  ********************
  const navigation = useNavigation()
  const route = useRoute<WriteNanumFormOnlineRouteProps>()

  // ******************** react queries  ********************

  console.log(route.params)

  // 처음에 화면 로드될 때 이전 페이지 작성 정보 가져옴
  const {images, category, title, contents, type, isOpenDateBooked, firstDate} = useMemo(() => {
    return route.params
  }, [])

  // ******************** states  ********************
  const [secretForm, toggleSecretForm] = useToggle(false) // 시크릿 폼 여부
  const [nanumAsks, setNanumAsks] = useState<INanumAskInfo[]>([])
  const [nanumGoods, setNanumGoods] = useState<INanumGoodsInfo[]>([]) // 상품 정보 state
  const [secretPwd, setSecretPwd] = useState('')

  // ******************** callbacks  ********************
  const onPressNext = useCallback(() => {
    navigation.navigate('WriteNanumFormComplete', {
      nanumIdx: 11111,
    })
  }, [secretForm, nanumAsks, nanumGoods, secretPwd])

  const checkNextEnabled = useCallback(() => {
    if (nanumGoods.length > 0) {
      return true
    } else {
      return false
    }
  }, [nanumGoods])

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <StackHeader goBack title="모집폼 작성" />
      <ScrollView style={[styles.container]}>
        <View style={[theme.styles.wrapper]}>
          <StepIndicator step={2} />
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
      <FloatingBottomButton label="다음" onPress={onPressNext} enabled={checkNextEnabled()} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },

  input: {
    marginTop: 5,
  },
  spacing: {
    marginBottom: 16,
  },
})
