import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import * as theme from '../../theme'

type GoodsListItemProps = {
  type: 'holding' | 'participating'
}

export const GoodsListItem = ({type}: GoodsListItemProps) => {
  return (
    <View style={[theme.styles.rowFlexStart, {marginBottom: 16}]}>
      <Text style={{flex: 1, color: theme.gray700, fontSize: 16}}>BTS 뷔 컨셉의 하트 키링</Text>
      <View style={theme.styles.rowFlexStart}>
        <Text style={{color: theme.gray500, marginRight: 5}}>{type == 'holding' ? '잔여 수량' : '주문 수량'}</Text>
        <Text style={{color: theme.secondary}}>30</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})
