import React, {useCallback, useMemo, useState} from 'react'
import {View, Text, TextInput, ScrollView, StyleSheet, Platform} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Switch} from 'react-native-paper'
import {useNavigation, useRoute} from '@react-navigation/native'
import KeyboardManager from 'react-native-keyboard-manager'
import moment from 'moment'
import {useMutation, useQueryClient} from 'react-query'
import {showMessage} from 'react-native-flash-message'

import {WriteNanumFormOnlineRouteProps} from '../../navigation/WriteNanumFormStackNavigator' // route props
import {INanumGoodsInfo, INanumAskInfo, INanumForm} from '../../types' // types
import {StackHeader, FloatingBottomButton, LoadingScreen, CheckboxIcon, EmptyCheckboxIcon} from '../../components/utils' // components
import {StepIndicator, NanumAsks, NanumGoodsInfo} from '../../components/WriteGoodsStack' // components
import * as theme from '../../theme' // themes
import {useToggle, useAppSelector} from '../../hooks' // hooks
import {queryKeys, postNanumForm} from '../../api'

export const WriteNanumFormOnline = () => {
  // ******************** utils  ********************
  const navigation = useNavigation()
  const route = useRoute<WriteNanumFormOnlineRouteProps>()
  const queryClient = useQueryClient()
  const user = useAppSelector(state => state.auth.user)

  // ******************** react queries  ********************
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

  // 처음에 화면 로드될 때 이전 페이지 작성 정보 가져옴
  const {images, category, title, contents, nanumMethod, isOpenDateBooked, firstDate} = useMemo(() => {
    return route.params
  }, [])

  // ******************** states  ********************
  const [secretForm, toggleSecretForm] = useToggle(false) // 시크릿 폼 여부
  const [nanumAsks, setNanumAsks] = useState<INanumAskInfo[]>([])
  const [nanumGoods, setNanumGoods] = useState<INanumGoodsInfo[]>([]) // 상품 정보 state
  const [secretPwd, setSecretPwd] = useState('')
  const [agreed, setAgreed] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)

  // ******************** callbacks  ********************
  const onPressNext = useCallback(() => {
    // post api가 실행중일때 다시 post하는 거 방지 & 이미 제출한 건에 대하여는 재제출 X
    if (postNanumFormQuery.isLoading || submitted == true) {
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

      nanumDatelist: [
        {
          accountIdx: user.accountIdx,
          nanumIdx: 0,
          acceptDate: '2022-07-01 12:43:15',
          location: '강남역 2번 출구',
          title: title,
        },
      ], // online이므로 비워둠
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
      nanumMethod: 'M', // M : Mail(우편), O : Offline(오프라인)
      firstDate: moment(firstDate).format('YYYY-MM-DD HH:mm:ss'), // example: 2022-07-01 12:43:15
      secretForm: secretForm ? 'Y' : 'N',
      secretPwd: secretPwd,
      accountDto: {
        accountCategoryDtoList: user.accountCategoryDtoList,
        accountIdx: user.accountIdx,
        creatorId: user.creatorId,
        email: user.email,
        accountImg: user.accountImg,
      },
      favorites: 0,
      job: category.job,
      categoryIdx: category.categoryIdx,
    }

    console.log(JSON.stringify(nanumForm))

    postNanumFormQuery.mutate(nanumForm)
  }, [secretForm, nanumAsks, nanumGoods, secretPwd, user, submitted])

  const checkNextEnabled = useCallback(() => {
    if (postNanumFormQuery.isLoading || submitted == true) {
      return false
    }

    if (agreed == false) {
      return false
    }

    if (nanumGoods.length > 0) {
      return true
    } else {
      return false
    }
  }, [nanumGoods, postNanumFormQuery, agreed, submitted])

  const onPressAgreed = useCallback(() => {
    setAgreed(agreed => !agreed)
  }, [])

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <StackHeader goBack title="모집폼 작성" />
      {postNanumFormQuery.isLoading && <LoadingScreen isLoading={postNanumFormQuery.isLoading} />}

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
        <View style={[theme.styles.wrapper, styles.spacing, theme.styles.rowFlexStart]}>
          {agreed ? <CheckboxIcon onPress={onPressAgreed} /> : <EmptyCheckboxIcon onPress={onPressAgreed} />}
          <Text style={styles.agreedText}>개인정보를 다른 목적으로 이용하지 않겠습니다.</Text>
        </View>
        <View style={{height: 80}}></View>
      </ScrollView>
      <FloatingBottomButton label="다음" onPress={onPressNext} enabled={checkNextEnabled()} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  agreedText: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    marginLeft: 8,
  },
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
