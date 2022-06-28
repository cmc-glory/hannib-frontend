import React, {useCallback, useState, useRef} from 'react'
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  StyleSheet,
  Platform,
} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import KeyboardManager from 'react-native-keyboard-manager'
import {useQuery} from 'react-query'

import {StackHeader, FloatingBottomButton, CheckboxIcon, NeccesaryField, SeparatorBold} from '../../components/utils'
import {FindAddress, ProductInfo} from '../../components/GoodsStack'
import {IRequestFormOnline, IProductInfo, ISharingRequestInfo} from '../../types'
import {queryKeys, getGoodsRequestInfo} from '../../api'
import * as theme from '../../theme'

const BUTTON_SIZE = 24

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

type makeNewFieldProps = {
  id: string
  label: string
  necessary: boolean
  refInputs: React.MutableRefObject<string[]>
  index: number
}

type setInputValueProps = {
  index: number
  value: string
  refInputs: React.MutableRefObject<string[]>
  setTextValue: React.Dispatch<React.SetStateAction<string>>
}

const setInputValue = (
  index: number,
  value: string,
  refInputs: React.MutableRefObject<string[]>,
  setTextValue: React.Dispatch<React.SetStateAction<string>>,
) => {
  const inputs = refInputs.current
  inputs[index] = value
  setTextValue(value)
}

const MakeNewField = ({label, necessary, refInputs, index}: makeNewFieldProps) => {
  const [textValue, setTextValue] = useState<string>('')
  refInputs.current.push('')
  return (
    <View style={styles.spacing}>
      <View style={[theme.styles.rowFlexStart]}>
        <Text style={[theme.styles.label]}>{label} (추가질문사항)</Text>
        {necessary && <NeccesaryField />}
      </View>
      <TextInput
        style={[theme.styles.input]}
        value={refInputs.current[index]}
        placeholder="추가 질문사항을 입력해 주세요."
        placeholderTextColor={theme.gray300}
        onChangeText={value => setInputValue(index, value, refInputs, setTextValue)}></TextInput>
    </View>
  )
}

export const GoodsReqeustOnline = () => {
  const refInputs = useRef<string[]>([])
  const [info, setInfo] = useState<ISharingRequestInfo>({
    products: [],
    title: '',
    additionalQuestions: [],
  })
  const [requestForm, setRequestForm] = useState<IRequestFormOnline>({
    name: '',
    address: {
      postcode: '',
      roadAddress: '',
      detailedAddress: '',
    },
    product: [],
    additionalQuestions: [],
  })
  const [selectedItems, setSelectedItems] = useState<any>({}) // 선택한 상품들

  // ***************************** react query *****************************
  useQuery(queryKeys.goodsRequestInfo, getGoodsRequestInfo, {
    onSuccess: data => {
      console.log('data :', data)
      setInfo(data)
      setRequestForm({
        ...requestForm,
      })
      data.products.forEach((item: any) => {
        selectedItems[item.id] = false
      })
    },
  })

  const onPressRequest = useCallback(() => {}, [])
  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader title="신청하기" goBack />
      <ScrollView>
        <View style={{marginBottom: 20, marginTop: 10}}>
          <Text style={[theme.styles.wrapper, styles.title]}>BTS 키링 나눔</Text>
          <View style={[theme.styles.wrapper]}>
            <Text style={[theme.styles.bold16]}>상품 선택</Text>
            {info.products.map(item => (
              <ProductInfo
                item={item}
                key={item.id}
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
              <Text style={styles.inputLabel}>이름</Text>
              <NeccesaryField />
            </View>

            <TextInput
              value={requestForm.name}
              onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => setRequestForm({...requestForm, name: e.nativeEvent.text})}
              style={[theme.styles.input, styles.input]}
              placeholder="이름"
              placeholderTextColor={theme.gray200}
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={[styles.spacing]}>
            <View style={[theme.styles.rowFlexStart]}>
              <Text style={styles.inputLabel}>주소</Text>
              <NeccesaryField />
            </View>

            <FindAddress requestForm={requestForm} setRequestForm={setRequestForm} />
          </View>
          {info.additionalQuestions.map((item, index) => (
            <MakeNewField id={item.id} label={item.content} necessary={item.necessary} refInputs={refInputs} index={index} />
          ))}
        </View>
      </ScrollView>
      <FloatingBottomButton label="제출하기" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
  input: {},
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
