import React, {useCallback, useState} from 'react'
import {View, Pressable, ScrollView, Text, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {
  StackHeader,
  FloatingBottomButton,
  DownArrowIcon,
  LeftArrowIcon,
  RightArrowIcon,
  SharingPreview,
  GoodsListItem,
  XIcon,
  MenuIcon,
  BottomSheet,
} from '../utils'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import {useToggle} from '../../hooks'
import * as theme from '../../theme'
import {IProductInfo} from '../../types'

type ReceiverListItem = {
  id: number
  onPressViewDetail: () => void
  index: number //db나오면 수정
  checkedItems: Array<any>
  handleSingleCheck: (id: number) => void
  acceptedYn: 'Y' | 'N'
  receiverName: string
  products: Array<IProductInfo>
}

//개별 리스트 아이템
export const ReceiverListItem = ({onPressViewDetail, index, checkedItems, id, handleSingleCheck, receiverName, acceptedYn, products}: ReceiverListItem) => {
  return (
    <Pressable
      onPress={() => {
        handleSingleCheck(id)
      }}
      style={[theme.styles.rowFlexStart, {paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: theme.gray200}]}>
      <View style={{maxWidth: 20, alignItems: 'center', marginRight: 12}}>
        <Text style={{marginBottom: 2, fontSize: 12}}>{index}</Text>
        <BouncyCheckbox
          disableBuiltInState
          size={20}
          fillColor={theme.secondary}
          style={{width: 20}}
          isChecked={checkedItems.includes(id)}
          onPress={() => {
            handleSingleCheck(id)
          }}
        />
      </View>

      <View style={{alignSelf: 'stretch', justifyContent: 'space-between', flex: 1}}>
        <View style={{flexDirection: 'row', marginBottom: 8}}>
          <Text style={{fontSize: 12}}>{receiverName}</Text>
          {acceptedYn == 'Y' ? (
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 12}}> | </Text>
              <Text style={{fontSize: 12, color: theme.main}}>수령완료</Text>
            </View>
          ) : null}
        </View>

        <Text style={{color: theme.gray700, fontSize: 16}}>
          {products[0].name}
          {products.length > 1 ? ` 외 ${products.length - 1}개` : null}
        </Text>
      </View>
      <Pressable style={[theme.styles.rowFlexStart]} onPress={onPressViewDetail}>
        <Text style={{color: theme.gray500}}>상세보기</Text>
        <RightArrowIcon />
      </Pressable>
    </Pressable>
  )
}
