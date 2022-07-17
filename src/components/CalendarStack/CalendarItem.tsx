import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import moment from 'moment'
import {Tag, ClockIcon, LocationIcon} from '../utils'
import * as theme from '../../theme'
import {ICalendarShow, IScheduleItem} from '../../types'

type CalendarItemProps = {
  item: ICalendarShow
}

export const CalendarItem = ({item}: CalendarItemProps) => {
  const {nanumIdx, title, goodsList, location, acceptDate} = item

  return (
    <View style={[styles.container]}>
      <View style={[styles.row, {marginBottom: 10}]}>
        <Tag label={item.type == 'participating' ? '참여' : '진행'} />
        <View style={[styles.row]}>
          <Text style={styles.normal}>{moment(acceptDate)?.format('HH:mm')}</Text>
          <ClockIcon size={20} />
        </View>
      </View>
      <View>
        <View style={[styles.row, {marginBottom: 4}]}>
          <Text style={[theme.styles.bold16, {color: theme.gray700}]}>{title}</Text>
          <View style={styles.row}>
            <Text style={styles.normal}>{location}</Text>
            <LocationIcon size={20} />
          </View>
        </View>
        <View>
          {goodsList?.map((product, index) => (
            <Text key={index} style={[styles.goodsitem, theme.styles.text14]}>
              {product.goodsName} {product.goodsNumber == null ? `(1)` : `(${product.goodsNumber})`}
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
