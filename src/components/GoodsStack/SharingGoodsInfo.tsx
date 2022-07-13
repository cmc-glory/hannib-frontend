import React, {useMemo} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {ProductTag} from '../utils'
import {IProductInfo, INanumGoodsDto} from '../../types'
import * as theme from '../../theme'

type SharingGoodsInfoProps = {
  products: INanumGoodsDto[]
}

export const SharingGoodsInfo = ({products}: SharingGoodsInfoProps) => {
  const nanumNum = useMemo(() => products.length, [])
  return (
    <View style={[{marginVertical: 16}]}>
      {products?.map((item, index) => (
        <View style={[styles.tagContainer, index != nanumNum - 1 && {marginBottom: 10}]} key={item.nanumIdx + item.goodsName}>
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
