import React, {useCallback, useState, useRef, useMemo, useEffect} from 'react'
import {View, Text, ScrollView, TextInput, NativeSyntheticEvent, TextInputChangeEventData, StyleSheet, Dimensions, Platform} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import KeyboardManager from 'react-native-keyboard-manager'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {useNavigation, useRoute} from '@react-navigation/native'

import {StackHeader, RoundButton, FloatingBottomButton, NeccesaryField, SeparatorBold, CheckboxIcon, EmptyCheckboxIcon} from '../../components/utils'
import {FindAddress, ProductInfoOnline, MakeNewField} from '../../components/GoodsStack'
import {IRequestFormOnline, INanumRequestRequiredDto, INanumApplyOnlineDto, INanumRequestReuiredAsk, INanumRequestGoods} from '../../types'
import {queryKeys, getNanumRequestRequiredInfo, postNanumRequestOnlineForm} from '../../api'
import * as theme from '../../theme'
import {GoodsRequestOnlineRouteProps} from '../../navigation/GoodsStackNavigator'
import {useAppSelector} from '../../hooks'

const PHONE_INPUT_WIDTH = (Dimensions.get('window').width - theme.PADDING_SIZE * 2 - 16 * 2) / 3

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

export const GoodsReqeustOnline = () => {
  // ***************************** utils *****************************
  const user = useAppSelector(state => state.auth.user)
  const [answers, setAnswers] = useState<string[]>([])
  const navigation = useNavigation()
  const route = useRoute<GoodsRequestOnlineRouteProps>()
  const nanumIdx = useMemo(() => route.params, [])
  const queryClient = useQueryClient()
  // ***************************** states *****************************
  const [selectedItems, setSelectedItems] = useState<any>({}) // 선택한 상품들
  const [info, setInfo] = useState<INanumRequestRequiredDto>({
    nanumIdx: nanumIdx.nanumIdx,
    goodsList: [],
    askList: [],
    title: '',
  })
  const [requestForm, setRequestForm] = useState<IRequestFormOnline>({
    name: '',
    address: {
      postcode: '',
      roadAddress: '',
      detailedAddress: '',
    },
    product: [],
    phonenumber: {
      first: '',
      second: '',
      third: '',
    },
  })
  const [agreed, setAgreed] = useState<boolean>(false) // 개인정보 수집 항목 동의

  // ******************** react query ********************
  const data = useQuery([queryKeys.nanumRequestRequiredInfo, nanumIdx], () => getNanumRequestRequiredInfo(parseInt(nanumIdx)), {
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

  const postNanumRequestOnlineFormQuery = useMutation(queryKeys.nanumRequestOnlineForm, postNanumRequestOnlineForm, {
    onSuccess(data, variables, context) {
      console.log('success')
      console.log(data)
      queryClient.invalidateQueries([queryKeys.nanumRequestOnlineForm])

      //const nanumIdx = data
      navigation.navigate('GoodsStackNavigator', {
        screen: 'GoodsRequestComplete',
      })
    },
    onError(error, variables, context) {
      console.log('error')
      console.log(error)
      // showMessage({
      //   // 에러 안내 메세지
      //   message: '나눔 신청 중 에러가 발생했습니다',
      //   type: 'info',
      //   animationDuration: 300,
      //   duration: 1350,
      //   style: {
      //     backgroundColor: 'rgba(36, 36, 36, 0.9)',
      //   },
      //   titleStyle: {
      //     fontFamily: 'Pretendard-Medium',
      //   },
      //   floating: true,
      // })

      navigation.navigate('GoodsStackNavigator', {
        screen: 'GoodsRequestError',
        params: {
          nanumIdx,
        },
      })
    },
  })

  // ***************************** callbacks *****************************
  const onPressAgreed = useCallback(() => {
    setAgreed(agreed => !agreed)
  }, [])

  const onPressRequest = useCallback(() => {
    if (postNanumRequestOnlineFormQuery.isLoading) {
      return
    }

    const requestApplyForm: INanumApplyOnlineDto = {
      applyAskAnswerLists: data.data.askList.map((item: INanumRequestReuiredAsk, index: number) => {
        return {
          accountIdx: user.accountIdx,
          nanumIdx: data.data.nanumIdx,
          askList: item.contents,
          answerList: answers[index],
        }
      }),
      nanumGoodsDtoList: data.data.goodsList
        .map((item: INanumRequestGoods, index: number) => {
          if (selectedItems[item.goodsIdx] == true && item != null) {
            return {
              goodsIdx: item.goodsIdx,
              accountIdx: user.accountIdx,
              nanumIdx: data.data.nanumIdx,
              goodsName: item.goodsName,
              realName: requestForm.name,
              goodsNumber: info.goodsList[index].goodsNumber,
            }
          } else return
        })
        .filter((n: INanumRequestGoods) => n),
      accountIdx: user.accountIdx,
      nanumIdx: parseInt(data.data.nanumIdx),
      realName: requestForm.name,
      address1: requestForm.address.postcode,
      address2: requestForm.address.roadAddress + ' ' + requestForm.address.detailedAddress,
      phoneNumber: requestForm.phonenumber.first + '-' + requestForm.phonenumber.second + '-' + requestForm.phonenumber.third,
    }
    console.log(JSON.stringify(requestApplyForm))

    postNanumRequestOnlineFormQuery.mutate(requestApplyForm)
  }, [requestForm, selectedItems, answers, data])

  const isButtonEnabled = useCallback(() => {
    // 기본 필수 정보 중에 하나라도 안 채워진 게 있으면 false 리턴
    if (
      requestForm.name == '' ||
      requestForm.address.detailedAddress == '' ||
      requestForm.address.postcode == '' ||
      requestForm.address.roadAddress == '' ||
      requestForm.phonenumber.first == '' ||
      requestForm.phonenumber.second == '' ||
      requestForm.phonenumber.third == '' ||
      requestForm.product.length == 0 ||
      agreed == false
    ) {
      return false
    }
    // 추가 질문 사항 중 필수 질문에 대한 input이 비어 있으면 false 리턴
    for (var i = 0; i < info.askList.length; i++) {
      if (info.askList[i].essential == 'Y' && answers[i] == '') {
        return false
      }
    }
    return true
  }, [requestForm, answers, info, nanumIdx, agreed])

  const ref_input: Array<React.RefObject<TextInput>> = []
  ref_input[0] = useRef(null)
  ref_input[1] = useRef(null)
  ref_input[2] = useRef(null)

  const onFocusNext = useCallback((index: number) => {
    if (ref_input[index + 1] && index < ref_input.length - 1) {
      ref_input[index + 1].current?.focus()
    }
    if (ref_input[index + 1] && index == ref_input.length - 1) {
      ref_input[index].current?.blur()
    }
  }, [])

  useEffect(() => {
    //console.log('selected : ', selectedItems)
  }, [selectedItems])

  return (
    <SafeAreaView edges={['top', 'bottom']} style={theme.styles.safeareaview}>
      <StackHeader title="신청하기" goBack />
      <ScrollView>
        <View style={{marginBottom: 20, marginTop: 10}}>
          <Text style={[theme.styles.wrapper, styles.title]}>{info.title}</Text>
          <View style={[theme.styles.wrapper]}>
            <Text style={[theme.styles.bold16]}>상품 선택</Text>
            {info.goodsList.map(item => (
              <ProductInfoOnline
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
            <View style={[theme.styles.rowFlexStart]}>
              <Text style={theme.styles.label}>이름</Text>
              <NeccesaryField />
            </View>
            <TextInput
              value={requestForm.name}
              onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setRequestForm({...requestForm, name: e.nativeEvent.text})}
              style={[theme.styles.input]}
              placeholder="이름"
              placeholderTextColor={theme.gray300}
              underlineColorAndroid="transparent"
            />
          </View>

          <View style={[styles.spacing]}>
            <View style={[theme.styles.rowFlexStart]}>
              <Text style={theme.styles.label}>주소</Text>
              <NeccesaryField />
            </View>
            <FindAddress requestForm={requestForm} setRequestForm={setRequestForm} />
          </View>
          <View style={[styles.spacing]}>
            <View style={[theme.styles.rowFlexStart]}>
              <Text style={theme.styles.label}>전화번호</Text>
              <NeccesaryField />
            </View>
            <View style={theme.styles.rowFlexStart}>
              <TextInput
                ref={ref_input[0]}
                value={requestForm.phonenumber.first}
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                  const text = e.nativeEvent.text
                  if (text.length == 3) {
                    onFocusNext(0)
                  }
                  setRequestForm({...requestForm, phonenumber: {...requestForm.phonenumber, first: text}})
                }}
                style={[theme.styles.input, {width: PHONE_INPUT_WIDTH}]}
                placeholder="000"
                placeholderTextColor={theme.gray300}
                underlineColorAndroid="transparent"
                keyboardType="number-pad"
                maxLength={3}
              />
              <View style={{width: 16}}>
                <Text style={{color: theme.gray500, textAlign: 'center'}}>-</Text>
              </View>

              <TextInput
                ref={ref_input[1]}
                value={requestForm.phonenumber.second}
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                  const text = e.nativeEvent.text
                  if (text.length == 4) {
                    onFocusNext(1)
                  }
                  setRequestForm({...requestForm, phonenumber: {...requestForm.phonenumber, second: text}})
                }}
                style={[theme.styles.input, {width: PHONE_INPUT_WIDTH}]}
                placeholder="0000"
                placeholderTextColor={theme.gray300}
                underlineColorAndroid="transparent"
                keyboardType="number-pad"
                maxLength={4}
              />
              <View style={{width: 16}}>
                <Text style={{color: theme.gray500, textAlign: 'center'}}>-</Text>
              </View>

              <TextInput
                ref={ref_input[2]}
                value={requestForm.phonenumber.third}
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
                  const text = e.nativeEvent.text
                  setRequestForm({...requestForm, phonenumber: {...requestForm.phonenumber, third: text}})
                }}
                keyboardType="number-pad"
                style={[theme.styles.input, {width: PHONE_INPUT_WIDTH}]}
                placeholder="0000"
                placeholderTextColor={theme.gray300}
                underlineColorAndroid="transparent"
                maxLength={4}
              />
            </View>
          </View>

          {info.askList.map((item, index) => (
            <MakeNewField
              key={item.askIdx}
              label={item.contents}
              necessary={item.essential == 'Y' ? true : false}
              index={index}
              answers={answers}
              setAnswers={setAnswers}
            />
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
        <View style={theme.styles.wrapper}>
          <RoundButton label="제출하기" enabled={isButtonEnabled()} onPress={onPressRequest} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
  spacing: {
    marginTop: 24,
  },
  label: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    marginLeft: 8,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    marginBottom: 16,
  },
})
