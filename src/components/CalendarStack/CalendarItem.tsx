import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import moment from 'moment'
import {Tag, ClockIcon, LocationIcon} from '../utils'
import * as theme from '../../theme'
import {IScheduleItem} from '../../types'

type CalendarItemProps = {
  item: IScheduleItem
}

export const CalendarItem = ({item}: CalendarItemProps) => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.row, {marginBottom: 10}]}>
        <Tag label={item.type == 'participating' ? '참여' : '진행'} />
        <View style={[styles.row]}>
          <Text style={styles.normal}>{moment(item.time).format('HH:mm ~')}</Text>
          <ClockIcon size={20} />
        </View>
      </View>
      <View>
        <View style={[styles.row, {marginBottom: 4}]}>
          <Text style={[theme.styles.bold16, {color: theme.gray700}]}>{item.title}</Text>
          <View style={styles.row}>
            <Text style={styles.normal}>{item.place}</Text>
            <LocationIcon size={20} />
          </View>
        </View>
        <View>
          {item.products.map(product => (
            <Text key={product.id} style={[styles.goodsitem, theme.styles.text14]}>
              {product.name} ({product.quantity})
            </Text>
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.main50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 4,
    marginBottom: theme.PADDING_SIZE,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  normal: {
    color: theme.gray700,
    marginRight: 4,
  },
  goodsitem: {
    color: theme.gray700,
    marginBottom: 5,
  },
})
