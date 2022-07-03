import React, {useCallback, useMemo, useState} from 'react'
import {View, Text, TextInput, ScrollView, StyleSheet, Platform} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Switch} from 'react-native-paper'
import {useNavigation, useRoute} from '@react-navigation/native'
import KeyboardManager from 'react-native-keyboard-manager'
import {useMutation} from 'react-query'
import {showMessage} from 'react-native-flash-message'

import {WriteGoodsOnlineRouteProps} from '../../navigation/WriteGoodsStackNavigator' // route props
import {IProductInfo, IAdditionalQuestion, ISharingForm} from '../../types' // types
import {StackHeader, FloatingBottomButton} from '../../components/utils' // components
import {StepIndicator, AdditionalQuestions, ProductInfo} from '../../components/WriteGoodsStack' // components
import * as theme from '../../theme' // themes
import {useToggle} from '../../hooks' // hooks
import {queryKeys, uploadNanumImages} from '../../api' // apis

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

export const EditGoodsOnline = () => {
  // ******************** utils  ********************
  const navigation = useNavigation()
  const route = useRoute<WriteGoodsOnlineRouteProps>()

  // ******************** react queries  ********************
  const uploadNanumImagesQuery = useMutation(queryKeys.nanumImages, uploadNanumImages, {
    onSuccess(data, variables, context) {
      navigation.navigate('WriteGoodsComplete', {
        id: '11111',
      })
    },
    onError(error, variables, context) {
      console.log(error)
      const sizeSum = images.reduce((prev, cur) => {
        return prev + (cur.fileSize == undefined ? 0 : cur.fileSize)
      }, 0)
      console.log(sizeSum)
      const message = sizeSum > 100000000 ? '최대 10MB까지 업로드 가능합니다' : '사진 업로드 중 에러가 발생했습니다'
      showMessage({
        message: message,
        type: 'info',
        animationDuration: 350,
        duration: 1850,
        style: {
          backgroundColor: 'rgba(36, 36, 36, 0.9)',
        },
        titleStyle: {
          fontFamily: 'Pretendard-Medium',
        },
        floating: true,
      })
    },
  })
  console.log(route.params)

  // 처음에 화면 로드될 때 이전 페이지 작성 정보 가져옴
  const {images, categories, title, content, type, isOpenDateBooked, openDate} = useMemo(() => {
    return route.params
  }, [])

  console.log('images :', images)

  // ******************** states  ********************
  const [isSecretForm, toggleSecretForm] = useToggle(false) // 시크릿 폼 여부
  const [additionalQuestions, setAdditionalQuestions] = useState<IAdditionalQuestion[]>([])
  const [products, setProducts] = useState<IProductInfo[]>([]) // 상품 정보 state
  const [secretKey, setSecretKey] = useState('')

  // ******************** callbacks  ********************
  const onPressNext = useCallback(() => {
    // 백에 전송할 나눔글 폼
    const form: ISharingForm = {
      images,
      categories,
      title,
      content,
      //hashtags,
      type,
      isOpenDateBooked,
      openDate,
      isSecretForm,
      additionalQuestions,
      products,
      secretKey,
    }

    const formData = new FormData()

    if (images.length > 0) {
      images.forEach(image => {
        let file = {
          uri: image.uri,
          type: 'multipart/form-data',
          name: 'image.jpg',
        }
        formData.append('nanumImg', file)
      })
      // let file = {
      //   uri: images[0].uri,
      //   type: 'multipart/form-data',
      //   name: 'image.jpg',
      // }
      // formData.append('nanumImg', file)
      uploadNanumImagesQuery.mutate(formData)
    }
  }, [isSecretForm, additionalQuestions, products, secretKey])

  const checkNextEnabled = useCallback(() => {
    if (products.length > 0) {
      return true
    } else {
      return false
    }
  }, [products])

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <StackHeader goBack title="모집폼 작성" />
      <ScrollView style={[styles.container]}>
        <View style={[theme.styles.wrapper]}>
          <StepIndicator step={2} />
        </View>

        <View style={[theme.styles.wrapper, styles.spacing]}>
          <ProductInfo productInfos={products} setProductInfos={setProducts} />
        </View>
        <View style={[theme.styles.wrapper, styles.spacing]}>
          <AdditionalQuestions questions={additionalQuestions} setQuestions={setAdditionalQuestions} />
        </View>

        <View style={[theme.styles.wrapper, styles.spacing]}>
          <View style={[theme.styles.rowSpaceBetween]}>
            <Text style={{fontFamily: 'Pretendard-Medium', fontSize: 16}}>시크릿 폼</Text>
            <Switch color={theme.gray800} onValueChange={toggleSecretForm} value={isSecretForm} />
          </View>
          <TextInput
            style={[theme.styles.input, {marginTop: 10}]}
            value={secretKey}
            onChangeText={setSecretKey}
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
