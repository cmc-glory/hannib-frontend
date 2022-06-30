import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import moment from 'moment'
import {Tag, Clock, LocationIcon} from '../utils'
import * as theme from '../../theme'
import {ICalendar} from '../../types'

type CalendarItemProps = {
  item: ICalendar
}

export const CalendarItem = ({item}: CalendarItemProps) => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.row, {marginBottom: 7}]}>
        <Tag label={item.type == 'participating' ? '참여' : '진행'} />
        <View style={[styles.row]}>
          <Text style={styles.normal}></Text>
          <Clock />
        </View>
      </View>
      <View>
        <View style={[styles.row, {marginBottom: 8}]}>
          <Text style={[theme.styles.bold16, {color: theme.gray700}]}>나눔 제목</Text>
          <View style={styles.row}>
            <Text style={styles.normal}>블루스퀘어</Text>
            <LocationIcon />
          </View>
        </View>
        <View>
          <Text style={styles.goodsitem}>BTS 뷔 컨셉의 하트 키링</Text>
          <Text style={styles.goodsitem}>BTS 뷔 컨셉의 하트 키링</Text>
          <Text style={styles.goodsitem}>BTS 뷔 컨셉의 하트 키링</Text>
          <Text style={styles.goodsitem}>BTS 뷔 컨셉의 하트 키링</Text>
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
    marginRight: 10,
  },
  goodsitem: {
    color: theme.gray700,
    marginBottom: 5,
  },
})
