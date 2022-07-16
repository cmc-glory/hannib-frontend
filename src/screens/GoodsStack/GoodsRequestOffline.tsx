import React, {useCallback, useMemo, useState} from 'react'
import {View, ScrollView, Text, Pressable, TextInput, TouchableOpacity, Platform, StyleSheet, Animated, Alert} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import moment from 'moment'
import {useQuery} from 'react-query'
import KeyboardManager from 'react-native-keyboard-manager'
import {useNavigation, useRoute} from '@react-navigation/native'
import {StackHeader, FloatingBottomButton, CheckboxIcon, EmptyCheckboxIcon, DownArrowIcon, SeparatorBold, NeccesaryField} from '../../components/utils'
import * as theme from '../../theme'
import {useAnimatedValue, useToggle, useAnimatedStyle} from '../../hooks'
import {INanumRequestRequiredDto, IRequestFormOffline, ISharingRequestInfo} from '../../types'
import {queryKeys, getGoodsRequestInfo, getNanumRequestRequiredInfo} from '../../api'
import {ProductInfoOffline, MakeNewField} from '../../components/GoodsStack'
import {GoodsRequestOfflineRouteProps, GoodsRequestOnlineRouteProps} from '../../navigation/GoodsStackNavigator'

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

const BUTTON_SIZE = 24

export const GoodsRequestOffline = () => {
  // ***************************** utils *****************************
  const [answers, setAnswers] = useState<string[]>([])
  const navigation = useNavigation()
  const route = useRoute<GoodsRequestOfflineRouteProps>()
  const nanumIdx = useMemo(() => route.params, [])
  // ***************************** states *****************************
  const [info, setInfo] = useState<INanumRequestRequiredDto>({
    nanumIdx: nanumIdx.nanumIdx,
    goodsList: [],
    askList: [],
  })
  const [selectedItems, setSelectedItems] = useState<any>({}) // 선택한 상품들
  const [scheduleLength, setScheduleLength] = useState<number>(1)
  const [requestForm, setRequestForm] = useState<IRequestFormOffline>({
    //api 수정 후 고쳐야함
    receiveDate: '',
    product: [],
  })
  const [opened, toggleOpened] = useToggle()
  const [agreed, setAgreed] = useState<boolean>(false) // 개인정보 수집 항목 동의

  // ***************************** react query *****************************
  useQuery(queryKeys.goodsRequestInfo, getGoodsRequestInfo, {
    onSuccess: data => {
      setInfo(data)
      setRequestForm({
        ...requestForm,
        receiveDate: data.schedule[0].time,
      })
      setScheduleLength(data.schedule ? data.schedule.length : 1)
      data.goodsList.forEach((item: any) => {
        selectedItems[item.id] = false
      })
      setAnswers(new Array(data.additionalQuestions.length).fill(''))
    },
  })

  const {data} = useQuery([queryKeys.nanumRequestRequiredInfo, nanumIdx], () => getNanumRequestRequiredInfo(parseInt(nanumIdx)), {
    onSuccess: data => {
      console.log('success')
      console.log(data)
      setInfo(data)
      data.goodsList.forEach((item: any) => {
        selectedItems[item.goodsIdx] = false
      })
      setAnswers(new Array(data.askList.length).fill(''))
    },
    onError(err) {
      console.log('err')
      console.log(err)
    },
  })

  // ***************************** animations *****************************
  const animatedValue = useAnimatedValue()
  const open = Animated.timing(animatedValue, {
    // Select box 토글 애니메이션
    toValue: opened == true ? 0 : 1,
    duration: 200,
    useNativeDriver: false,
  })
  const animatedHeight = animatedValue.interpolate({
    // select box 높이
    inputRange: [0, 1],
    outputRange: [0, theme.INPUT_HEIGHT * scheduleLength],
    extrapolate: 'clamp',
  })
  const animatedInputHeight = animatedValue.interpolate({
    // select box 높이
    inputRange: [0, 1],
    outputRange: [0, theme.INPUT_HEIGHT],
    extrapolate: 'clamp',
  })
  const animatedRotation = animatedValue.interpolate({
    // select arrow 회전 애니메이션
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  })
  const animatedArrowStyle = useAnimatedStyle({transform: [{rotate: animatedRotation}]})
  const animatedSelectionBoxStyle = useAnimatedStyle({height: animatedHeight, borderWidth: animatedValue}, [animatedHeight])
  const animatedSelectionInputStyle = useAnimatedStyle({height: animatedInputHeight, opacity: animatedValue})

  // ***************************** callbacks *****************************
  const onPressAgreed = useCallback(() => {
    setAgreed(agreed => !agreed)
  }, [])
  const onPressOpen = useCallback(() => {
    // select box누르면 애니메이션 시작
    open.start(toggleOpened)
  }, [opened])

  const onPressDate = useCallback(
    (date: Date | undefined) => {
      // 카테고리 선택하면, set하고 닫음
      open.start(toggleOpened)
      setRequestForm({...requestForm, receiveDate: date})
      //setMainCategory(mainCategory => (mainCategory == '가수' ? '배우' : '가수'))
    },
    [opened],
  )

  const isButtonEnabled = useCallback(() => {
    // 기본 필수 정보 중에 하나라도 안 채워진 게 있으면 false 리턴
    if (requestForm.receiveDate == '' || requestForm.product.length == 0 || agreed == false) {
      return false
    }
    // 추가 질문 사항 중 필수 질문에 대한 input이 비어 있으면 false 리턴
    for (var i = 0; i < info.askList.length; i++) {
      console.log(info.askList[i].essential, answers[i])
      if (info.askList[i].essential == 'Y' && answers[i] == '') {
        return false
      }
    }
    return true
  }, [requestForm, answers, info, agreed])

  const onPressRequest = useCallback(
    (requestForm: IRequestFormOffline) => {
      console.log(answers)
      console.log(requestForm)
      navigation.navigate('GoodsStackNavigator', {
        screen: 'GoodsRequestComplete',
        params: {
          nanumIdx: nanumIdx,
        },
      })
    },
    [requestForm, answers],
  )

  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader title="신청하기" goBack />
      <ScrollView>
        <View style={{marginBottom: 20, marginTop: 10}}>
          <Text style={[theme.styles.wrapper, styles.title]}>BTS 키링 나눔</Text>
          <View style={[theme.styles.wrapper]}>
            <Text style={[theme.styles.bold16]}>상품 선택</Text>
            {info.goodsList.map((item, index) => (
              <ProductInfoOffline
                item={item}
                key={item.goodsIdx}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                requestForm={requestForm}
                setRequestForm={setRequestForm}
              />
            ))}
          </View>
        </View>
        <SeparatorBold />

        <View style={[{padding: theme.PADDING_SIZE}]}>
          <Text style={[theme.styles.bold16]}>정보 입력</Text>
          <View style={[styles.spacing]}>
            <View style={theme.styles.rowFlexStart}>
              <Text style={styles.inputLabel}>나눔 수령일</Text>
              <NeccesaryField />
            </View>

            <Pressable
              onPress={onPressOpen}
              style={[
                styles.input,
                theme.styles.rowSpaceBetween,
                {height: theme.INPUT_HEIGHT},
                styles.borderTopRadius,
                opened == false && styles.borderBottomRadius,
              ]}>
              <Text style={{marginLeft: 16}}>{moment(requestForm.receiveDate).format('YYYY.MM.DD HH:mm')}</Text>
              <Animated.View style={{...animatedArrowStyle, marginRight: 16}}>
                <DownArrowIcon onPress={onPressOpen} />
              </Animated.View>
            </Pressable>
            <Animated.View style={[{marginTop: -1, borderColor: theme.gray300}, animatedSelectionBoxStyle, styles.borderBottomRadius]}>
              {/* {info.schedule?.map((schedule, index) => (
                <Animated.View
                  key={index}
                  style={[{...animatedSelectionInputStyle, justifyContent: 'center'}, index !== scheduleLength - 1 && styles.inputItemSeparator]}>
                  <Pressable onPress={() => onPressDate(schedule.time)}>
                    <Animated.Text style={{marginLeft: 16}}>{moment(schedule.time).format('YYYY.MM.DD HH:mm')}</Animated.Text>
                  </Pressable>
                </Animated.View>
              ))} */}
            </Animated.View>
          </View>
          {info.askList.map((item, index) => (
            <MakeNewField key={index} label={item.contents} necessary={item.essential} index={index} answers={answers} setAnswers={setAnswers} />
          ))}

          <View style={styles.spacing}>
            <View style={[theme.styles.rowFlexStart]}>
              {agreed ? <CheckboxIcon onPress={onPressAgreed} /> : <EmptyCheckboxIcon onPress={onPressAgreed} />}
              <Text style={styles.label}>개인정보 수집 및 동의</Text>
            </View>
            <View style={styles.agreedContentView}>
              <Text style={styles.agreedContentText}>
                상품 주문 및 배송을 위해 입력된 개인정보를 수집합니다. 수집한 개인정보는 주문과 배송 이외의 목적으로는 사용하지 않습니다.
              </Text>
              <Text style={styles.agreedContentText}>개인정보의 수집 및 이용에 대한 동의를 거부할수 있으며, 이 경우 상품 주문이 어려울 수 있습니다.</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <FloatingBottomButton label="제출하기" enabled={isButtonEnabled()} onPress={() => onPressRequest(requestForm)} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    marginLeft: 8,
  },
  agreedContentText: {
    fontSize: 12,
    lineHeight: 16,
    color: theme.gray700,
  },
  agreedContentView: {
    marginTop: 8,
    padding: 12,
    backgroundColor: theme.gray50,
  },
  inputItemSeparator: {
    borderBottomColor: theme.gray100,
    borderBottomWidth: 1,
  },
  borderTopRadius: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  borderBottomRadius: {
    borderBottomEndRadius: 4,
    borderBottomStartRadius: 4,
    //borderBottomRightRadius: 40,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Pretendard-Medium',
    marginBottom: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.gray300,
    marginRight: 8,
  },
  spacing: {
    marginTop: 24,
  },
  input: {
    borderColor: theme.gray300,
    borderWidth: 1,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    marginBottom: 16,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemName: {
    fontFamily: 'Pretendard-Medium',
    color: theme.gray700,
    fontSize: 16,
    flex: 1,
  },
  ItemQuantity: {
    color: theme.gray500,
    marginRight: 5,
  },
  quantityButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    borderColor: theme.black,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.white,
  },
})
