import React, {useCallback} from 'react'
import {View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

import AddIcon from '../../assets/icons/add.svg'
import RemoveIcon from '../../assets/icons/minus-svgrepo-com.svg'
import {StackHeader, NextButton, FloatingBottomButton} from '../../components/utils'
import {black, white, gray200, gray500, main, gray700, styles as s} from '../../theme'
import {useAutoFocus, AutoFocusProvider} from '../../contexts'

const ICON_SIZE = 16
const BUTTON_SIZE = 24

const ItemQuantity = () => {
  return (
    <View style={[styles.flexRow, {justifyContent: 'space-between', marginVertical: 7.5}]}>
      <View style={[]}>
        <Text style={[styles.itemName]}>BTS 뷔 컨셉의 하트 키링</Text>
        <View style={[styles.flexRow, {marginTop: 5}]}>
          <Text style={{marginRight: 5, color: gray500}}>수량</Text>
          <Text style={{color: main}}>30</Text>
        </View>
      </View>
      <View style={[styles.flexRow]}>
        <TouchableOpacity style={styles.quantityButton}>
          <RemoveIcon width={ICON_SIZE} height={ICON_SIZE} fill={black} />
        </TouchableOpacity>
        <Text style={{marginHorizontal: 20, color: black}}>1</Text>
        <TouchableOpacity style={styles.quantityButton}>
          <AddIcon width={ICON_SIZE} height={ICON_SIZE} fill={black} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export const GoodsRequest = () => {
  const onPressRequest = useCallback(() => {}, [])
  const focus = useAutoFocus()
  return (
    <SafeAreaView style={s.safeareaview}>
      <StackHeader title="신청하기" goBack />
      <AutoFocusProvider>
        <Text style={[s.wrapper, styles.title]}>Lorem ipsum dolor sit amet, consectetur </Text>

        <View style={[s.wrapper]}>
          <Text style={[s.bold16, {marginBottom: 10}]}>수량 선택</Text>
          <View style={[]}>
            <ItemQuantity />
            <ItemQuantity />
            <ItemQuantity />
            <ItemQuantity />
          </View>
        </View>

        <View style={[s.wrapper]}>
          <Text style={s.bold16}>나눔 수령일</Text>
          <TextInput style={[s.input, styles.input]} placeholder="나눔 수령일 선택" onFocus={focus} placeholderTextColor={gray200} />
        </View>
        <View style={[s.wrapper]}>
          <Text style={s.bold16}>이름</Text>
          <TextInput style={[s.input, styles.input]} placeholder="이름" onFocus={focus} placeholderTextColor={gray200} />
        </View>
        <View style={[s.wrapper]}>
          <Text style={s.bold16}>트위터 아이디</Text>
          <TextInput style={[s.input, styles.input]} placeholder="트위터 아이디" onFocus={focus} placeholderTextColor={gray200} />
        </View>
        <View style={[s.wrapper]}>
          <Text style={s.bold16}>주소</Text>
          <TextInput style={[s.input, styles.input]} placeholder="주소" onFocus={focus} placeholderTextColor={gray200} />
        </View>

        <View style={[s.wrapper, {marginBottom: 80}]}>
          <Text style={s.bold16}>전화번호</Text>
          <TextInput style={[s.input, styles.input]} placeholder="전화번호" onFocus={focus} placeholderTextColor={gray200} />
        </View>
      </AutoFocusProvider>
      {/* <NextButton text="신청하기" onPressNext={onPressRequest} /> */}
      <FloatingBottomButton label="제출하기" />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
  },
  title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 20,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemName: {
    fontFamily: 'Pretendard-Medium',
    color: gray700,
    fontSize: 16,
    marginRight: 15,
  },
  ItemQuantity: {
    color: gray500,
    marginRight: 5,
  },
  quantityButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    borderColor: black,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white,
  },
})
