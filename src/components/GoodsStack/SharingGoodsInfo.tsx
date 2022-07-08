import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {ProductTag} from '../utils'
import {IProductInfo, INanumGoodsDto} from '../../types'
import * as theme from '../../theme'

type SharingGoodsInfoProps = {
  products: INanumGoodsDto[]
}

export const SharingGoodsInfo = ({products}: SharingGoodsInfoProps) => {
  return (
    <View style={[{marginVertical: 16}]}>
      {products?.map(item => (
        <View style={[styles.tagContainer, {marginBottom: 10}]} key={item.nanumIdx + item.goodsName}>
          <ProductTag label={item.goodsName} />
          <Text style={[styles.quantityText]}>{item.goodsNumber}개</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    fontFamily: 'Pretendard-Regular',
    color: theme.gray800,
  },
})
