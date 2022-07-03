import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import * as theme from '../../theme'

type GoodsListItemProps = {
  type: 'holding' | 'participating'
  title: string
  quantity: number
}

export const GoodsListItem = ({type, title, quantity}: GoodsListItemProps) => {
  return (
    <View style={[theme.styles.rowFlexStart, {marginBottom: 16}]}>
      <Text style={{flex: 1, color: theme.gray700, fontSize: 16}}>{title}</Text>
      <View style={theme.styles.rowFlexStart}>
        <Text style={{color: theme.gray500, marginRight: 5}}>{type == 'holding' ? '잔여 수량' : '주문 수량'}</Text>
        <Text style={{color: theme.secondary}}>{quantity}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})
