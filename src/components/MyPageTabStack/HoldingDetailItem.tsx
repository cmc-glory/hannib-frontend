import React, {useCallback, useState} from 'react'
import {View, Pressable, ScrollView, Text, StyleSheet} from 'react-native'
import {LeftArrowIcon, RightArrowIcon, XIcon} from '../../components/utils'
import * as theme from '../../theme'
import {IHoldingReceiverInfo, IProductInfo} from '../../types'
import {HoldingSharingDetail} from './HoldingSharingDetail'

type HoldingDetailItem = {
  isOnline: boolean
  onPressLeftArrow: () => void
  onPressRightArrow: () => void
  cntList?: number
  setIsDetail: (bool: boolean) => void
  products?: Array<IHoldingReceiverInfo>
}

export const HoldingDetailItem = ({onPressLeftArrow, onPressRightArrow, cntList, setIsDetail, products}: HoldingDetailItem) => {
  return (
    <View>
      <View style={[theme.styles.rowSpaceBetween, {marginTop: 16}]}>
        <View style={[theme.styles.rowSpaceBetween, {width: 85}]}>
          <LeftArrowIcon size={24} onPress={onPressLeftArrow} />
          <Text>
            {' '}
            {cntList} / {products?.length}{' '}
          </Text>
          <RightArrowIcon size={24} onPress={onPressRightArrow} />
        </View>
        <XIcon size={20} onPress={() => setIsDetail(false)} />
      </View>
      <HoldingSharingDetail />
    </View>
  )
}
