import React, {useCallback} from 'react'
import {View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'

import AddIcon from '../../assets/icons/add.svg'
import RemoveIcon from '../../assets/icons/minus-svgrepo-com.svg'
import {StackHeader, NextButton} from '../../components/utils'
import {black, gray200, styles as s} from '../../theme'

const ICON_SIZE = 16
const BUTTON_SIZE = 24

const ItemQuantity = () => {
  return (
    <View style={[styles.flexRow, {justifyContent: 'space-between', marginVertical: 7.5}]}>
      <View style={[styles.flexRow]}>
        <Text style={[styles.itemName]}>제품1</Text>
        <Text style={[styles.ItemQuantity]}>수량 30</Text>
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
  return (
    <SafeAreaView style={s.safeareaview}>
      <StackHeader title="신청하기" goBack />
      <ScrollView>
        <Text style={[s.wrapper, s.label]}>Lorem ipsum dolor sit amet, consectetur </Text>
        <View style={[s.wrapper]}>
          <ItemQuantity />
          <ItemQuantity />
          <ItemQuantity />
          <ItemQuantity />
        </View>

        <View style={[s.wrapper]}>
          <Text style={s.label}>나눔 수령일</Text>
          <TextInput style={s.input} placeholder="나눔 수령일 선택" placeholderTextColor={gray200} />
        </View>
        <View style={[s.wrapper]}>
          <Text style={s.label}>이름</Text>
          <TextInput style={s.input} placeholder="이름" placeholderTextColor={gray200} />
        </View>
        <View style={[s.wrapper]}>
          <Text style={s.label}>트위터 아이디</Text>
          <TextInput style={s.input} placeholder="트위터 아이디" placeholderTextColor={gray200} />
        </View>
        <View style={[s.wrapper]}>
          <Text style={s.label}>주소</Text>
          <TextInput style={s.input} placeholder="주소" placeholderTextColor={gray200} />
        </View>

        <View style={[s.wrapper, {marginBottom: 80}]}>
          <Text style={s.label}>전화번호</Text>
          <TextInput style={s.input} placeholder="전화번호" placeholderTextColor={gray200} />
        </View>
      </ScrollView>
      <NextButton text="신청하기" onPressNext={onPressRequest} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemName: {
    fontFamily: 'Pretendard-Medium',
    color: black,
    fontSize: 16,
    marginRight: 15,
  },
  ItemQuantity: {
    color: black,
  },
  quantityButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    borderColor: black,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
