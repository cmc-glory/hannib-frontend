import React, {useCallback} from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {CheckboxIcon} from '../utils'
import * as theme from '../../theme'
import {INanumGoods, INanumGoodsDto, IProductInfo, IRequestFormOffline} from '../../types'

type ProductInfoProps = {
  item: INanumGoods
  key: number
  selectedItems: any
  setSelectedItems: React.Dispatch<React.SetStateAction<any>>
  requestForm: IRequestFormOffline
  setRequestForm: React.Dispatch<React.SetStateAction<IRequestFormOffline>>
}

export const ProductInfoOffline = ({item, selectedItems, setSelectedItems, requestForm, setRequestForm}: ProductInfoProps) => {
  const selected = selectedItems[item.goodsIdx]
  const onPressCheckbox = useCallback(() => {
    setSelectedItems({...selectedItems, [item.goodsIdx]: !selected})

    // 선택된 상태면 제거
    if (selected) {
      const temp = requestForm.product.filter(productItem => productItem.productid != item.goodsIdx)
      setRequestForm({...requestForm, product: temp})
    } else {
      const temp = requestForm.product.concat({productid: item.goodsIdx})
      setRequestForm({...requestForm, product: temp})
    }
  }, [selectedItems, requestForm])
  return (
    <View style={[theme.styles.rowFlexStart, {marginTop: 16}]}>
      {selected ? <CheckboxIcon onPress={onPressCheckbox} style={{marginRight: 8}} /> : <TouchableOpacity onPress={onPressCheckbox} style={styles.checkbox} />}
      <Text style={[styles.itemName]}>{item.goodsName}</Text>
      <View style={[theme.styles.rowFlexStart]}>
        <Text style={{marginRight: 5, color: theme.gray500}}>잔여 수량</Text>
        <Text style={{color: theme.main}}>{item.goodsNumber}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  itemName: {
    fontFamily: 'Pretendard-Medium',
    color: theme.gray700,
    fontSize: 16,
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.gray300,
    marginRight: 8,
  },
})
