import React, {useCallback, useState} from 'react'
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

import {StackHeader, FloatingBottomButton} from '../../components/utils'
import {FindAddress} from '../../components/GoodsStack'
import * as theme from '../../theme'
import {useAutoFocus, AutoFocusProvider} from '../../contexts'
import {IRequestForm} from '../../types'

const BUTTON_SIZE = 24

const ItemQuantity = () => {
  return (
    <View style={[styles.flexRow, {marginTop: 16}]}>
      <BouncyCheckbox size={20} iconStyle={{borderRadius: 2, borderColor: theme.gray300}} fillColor={theme.gray800} />

      <Text style={[styles.itemName]}>BTS 뷔 컨셉의 하트 키링</Text>
      <View style={[styles.flexRow, {marginTop: 5}]}>
        <Text style={{marginRight: 5, color: theme.gray500}}>잔여 수량</Text>
        <Text style={{color: theme.main}}>30</Text>
      </View>
    </View>
  )
}

export const GoodsRequest = () => {
  const [requestForm, setRequestForm] = useState<IRequestForm>({
    recieveDate: '',
    twitterid: '',
    name: '',
    address: {
      postcode: '',
      roadAddress: '',
      detailedAddress: '',
    },
    phonenumber: '',
  })

  const onChangeText = useCallback(() => {}, [])

  const onPressRequest = useCallback(() => {}, [])
  const focus = useAutoFocus()
  return (
    <SafeAreaView style={theme.styles.safeareaview}>
      <StackHeader title="신청하기" goBack />
      <AutoFocusProvider>
        <View style={{marginBottom: 20}}>
          <Text style={[theme.styles.wrapper, styles.title]}>Lorem ipsum dolor sit amet, consectetur </Text>
          <View style={[theme.styles.wrapper]}>
            <Text style={[theme.styles.bold16]}>상품 선택</Text>
            <ItemQuantity />
            <ItemQuantity />
            <ItemQuantity />
            <ItemQuantity />
          </View>
        </View>

        <View style={[theme.styles.wrapper, {marginTop: 20}]}>
          <Text style={[theme.styles.bold16, styles.spacing]}>정보 입력</Text>
          <View style={[styles.spacing]}>
            <Text>나눔 수령일</Text>
            <TextInput
              value={requestForm.recieveDate}
              onChange={(e: any) => setRequestForm({...requestForm, recieveDate: e.nativeEvent.text})}
              style={[theme.styles.input, styles.input]}
              placeholder="나눔 수령일 선택"
              onFocus={focus}
              placeholderTextColor={theme.gray200}
            />
          </View>
          <View style={[styles.spacing]}>
            <Text>이름</Text>
            <TextInput
              value={requestForm.name}
              onChange={(e: any) => setRequestForm({...requestForm, name: e.nativeEvent.text})}
              style={[theme.styles.input, styles.input]}
              placeholder="이름"
              onFocus={focus}
              placeholderTextColor={theme.gray200}
            />
          </View>
          <View style={[styles.spacing]}>
            <Text>트위터 아이디</Text>
            <TextInput
              value={requestForm.twitterid}
              onChange={(e: any) => setRequestForm({...requestForm, twitterid: e.nativeEvent.text})}
              style={[theme.styles.input, styles.input]}
              placeholder="트위터 아이디"
              onFocus={focus}
              placeholderTextColor={theme.gray200}
            />
          </View>
          <View style={[styles.spacing]}>
            <Text>주소</Text>
            <FindAddress requestForm={requestForm} setRequestForm={setRequestForm} />
          </View>

          <View style={[{marginBottom: 30}]}>
            <Text>전화번호</Text>
            <TextInput
              value={requestForm.phonenumber}
              onChange={(e: any) => setRequestForm({...requestForm, phonenumber: e.nativeEvent.text})}
              style={[theme.styles.input, styles.input]}
              placeholder="전화번호"
              onFocus={focus}
              placeholderTextColor={theme.gray200}
            />
          </View>
        </View>
      </AutoFocusProvider>
      <FloatingBottomButton label="제출하기" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  spacing: {
    marginBottom: 16,
  },
  input: {
    marginTop: 8,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
    marginBottom: 15,
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
