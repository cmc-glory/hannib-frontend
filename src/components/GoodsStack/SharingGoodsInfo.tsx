import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {ProductTag} from '../utils'
import * as theme from '../../theme'

export const SharingGoodsInfo = () => {
  return (
    <View style={[{marginVertical: 16}]}>
      <View style={[styles.tagContainer, {marginBottom: 10}]}>
        <ProductTag label="BTS 진 컨셉의 하트 키링" />
        <Text style={[styles.quantityText]}>30개</Text>
      </View>
      <View style={[styles.tagContainer, {marginBottom: 10}]}>
        <ProductTag label="BTS 지민 컨셉의 스페이드 키링" />
        <Text style={[styles.quantityText]}>30개</Text>
      </View>
      <View style={[styles.tagContainer, {marginBottom: 10}]}>
        <ProductTag label="BTS 뷔 컨셉의 클로버 키링" />
        <Text style={[styles.quantityText]}>30개</Text>
      </View>
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
