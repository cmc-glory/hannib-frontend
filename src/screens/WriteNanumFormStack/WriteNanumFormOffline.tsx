import React, {useCallback, useMemo, useState} from 'react'
import {View, Text, TextInput, ScrollView, StyleSheet, Platform} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Switch} from 'react-native-paper'
import moment from 'moment'
import KeyboardManager from 'react-native-keyboard-manager'
import {useNavigation, useRoute} from '@react-navigation/native'
import {useMutation, useQueryClient} from 'react-query'
import {showMessage} from 'react-native-flash-message'

import {useToggle, useAppSelector} from '../../hooks'
import {queryKeys, postNanumForm} from '../../api'
import {WriteNanumFormOfflineRouteProps, WriteNanumFormOfflineNavigationProps} from '../../navigation/WriteNanumFormStackNavigator'
import {StackHeader, FloatingBottomButton, CheckboxIcon, EmptyCheckboxIcon} from '../../components/utils'
import {StepIndicator, NanumGoodsInfo, NanumAsks, SelectTimeLocation} from '../../components/WriteGoodsStack'
import * as theme from '../../theme'
import {INanumAskInfo, INanumGoodsInfo, INanumDateInfo, INanumForm} from '../../types'

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
  const queryClient = useQueryClient()
  const user = useAppSelector(state => state.auth.user)

  const {images, category, title, contents, nanumMethod, firstDate} = useMemo(() => {
    return route.params
  }, [])

  // ***************************** react queries *****************************

  const postNanumFormQuery = useMutation(queryKeys.nanumForm, postNanumForm, {
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries([queryKeys.nanumList])
      setSubmitted(true)
      const nanumIdx = data
      navigation.navigate('WriteNanumFormComplete', {
        nanumIdx: nanumIdx,
      })
    },
    onError(error, variables, context) {
      console.log('error')
      console.log(error)
      showMessage({
        // 에러 안내 메세지
        message: '나눔폼 업로드 중 에러가 발생했습니다',
        type: 'info',
        animationDuration: 300,
        duration: 1350,
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
  // ***************************** states *****************************
  const [secretForm, toggleSecretForm] = useToggle(false) // 시크릿 폼 여부
  const [nanumAsks, setNanumAsks] = useState<INanumAskInfo[]>([])
  const [nanumGoods, setNanumGoods] = useState<INanumGoodsInfo[]>([]) // 상품 정보 state
  const [secretPwd, setSecretPwd] = useState('')
  const [nanumDates, setNanumDates] = useState<INanumDateInfo[]>([])
  const [agreed, setAgreed] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false) // 중복 제출 방지

  // 처음에 화면 로드될 때 이전 페이지 작성 정보 가져옴

  // ***************************** callbacks *****************************
  const isButtonEnabled = useCallback(() => {
    if (postNanumFormQuery.isLoading || submitted == true) {
      return false
    }
    if (agreed == false) {
      return false
    }
    if (nanumDates.length == 0 || nanumGoods.length == 0) {
      return false
    }
    return true
  }, [nanumDates, nanumGoods, postNanumFormQuery, agreed, submitted])

  const onPressNext = useCallback(() => {
    // post api가 진행중이면 다시 시도하지 않기
    if (postNanumFormQuery.isLoading) {
      return
    }
    const nanumForm: INanumForm = {
      nanumAskList:
        nanumAsks.length == 0
          ? []
          : nanumAsks.map(item => {
              return {
                nanumIdx: 0,
                contents: item.contents,
                essential: item.essential ? 'Y' : 'N',
              }
            }),
      nanumDatelist: nanumDates.map(item => {
        return {
          accountIdx: user.accountIdx,
          nanumIdx: 0,
          acceptDate: moment(item.acceptDate).format('YYYY-MM-DD HH:mm:ss'),
          location: item.location,
          title: title,
        }
      }),
      nanumGoodslist: nanumGoods.map(item => {
        return {
          nanumIdx: 0,
          goodsName: item.goodsName,
          goodsNumber: item.goodsNumber,
          accountIdx: user.accountIdx,
        }
      }),
      nanumImglist: images.map(item => {
        return {
          nanumIdx: 0,
          imgUrl: item,
        }
      }),
      accountIdx: user.accountIdx,
      nanumIdx: 0,
      creatorId: user.creatorId,
      thumbnail: images[0],
      category: category.category,
      title: title,
      contents: contents,
      nanumMethod: 'O', // M : Mail(우편), O : Offline(오프라인)
      firstDate: moment(firstDate).format('YYYY-MM-DD HH:mm:ss'), // example: 2022-07-01 12:43:15
      secretForm: secretForm ? 'Y' : 'N',
      secretPwd: secretPwd,
      favorites: 0,
      job: category.job,
      accountDto: {
        accountCategoryDtoList: user.accountCategoryDtoList,
        accountIdx: user.accountIdx,
        creatorId: user.creatorId,
        email: user.email,
        accountImg: user.accountImg,
      },
      categoryIdx: category.categoryIdx,
    }

    postNanumFormQuery.mutate(nanumForm)
  }, [secretForm, nanumAsks, nanumGoods, secretPwd, user, submitted])

  const onPressAgreed = useCallback(() => {
    setAgreed(agreed => !agreed)
  }, [])

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
        <View style={[theme.styles.wrapper, styles.spacing, theme.styles.rowFlexStart]}>
          {agreed ? <CheckboxIcon onPress={onPressAgreed} /> : <EmptyCheckboxIcon onPress={onPressAgreed} />}
          <Text style={styles.agreedText}>개인정보를 다른 목적으로 이용하지 않겠습니다.</Text>
        </View>
        <View style={[theme.styles.wrapper, styles.spacing]}>
          <Text style={styles.termText}>부적절한 게시물 등록 시 비 노출 또는 무통보 삭제될 수 있습니다.</Text>
          <Text style={styles.termText}>- 비방/욕설/명예훼손에 해당되는 게시물</Text>
          <Text style={styles.termText}>- 저작권에 위배된 작품</Text>
          <Text style={styles.termText}>- 개인정보를 포함한 오프라인 만남 유도 내용</Text>
        </View>
        <View style={{height: 80}}></View>
      </ScrollView>

      <FloatingBottomButton enabled={isButtonEnabled()} label="다음" onPress={onPressNext} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  termText: {
    fontSize: 12,
    lineHeight: 16,
    color: theme.gray500,
    marginBottom: 2,
  },
  agreedText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    marginLeft: 8,
  },
  container: {
    backgroundColor: '#fff',
  },

  spacing: {
    marginBottom: 24,
  },
})
