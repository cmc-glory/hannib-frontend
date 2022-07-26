import React, {useCallback} from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native'
import moment from 'moment'
import {Tag, ClockIcon, LocationIcon} from '../utils'
import * as theme from '../../theme'
import {ICalendarShow, IScheduleItem} from '../../types'
import {useNavigation} from '@react-navigation/native'

type CalendarItemProps = {
  item: ICalendarShow
}

export const CalendarItem = ({item}: CalendarItemProps) => {
  const {nanumIdx, title, goodsList, location, acceptDate, type} = item
  const navigation = useNavigation()
  console.log('item in calendar item : ', item)
  const goHolding = () => {
    navigation.navigate('HoldingSharingStackNavigator', {
      screen: 'HoldingSharing',
      params: {
        nanumIdx: nanumIdx,
      },
    })
  }

  const goParticipate = () => {
    navigation.navigate('ParticipatingSharingStackNavigator', {
      screen: 'ParticipatingSharingOffline',
      params: {
        nanumIdx: nanumIdx,
      },
    })
  }

  return (
    <Pressable style={[styles.container]} onPress={type == 'participating' ? goParticipate : goHolding}>
      <View style={[styles.row, {marginBottom: 10}]}>
        <Tag label={type == 'participating' ? '참여' : '진행'} />
        <View style={[styles.row]}>
          <Text style={styles.normal}>{moment(acceptDate, 'YYYYMMDDHHmmss')?.format('HH:mm')}</Text>
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
    </Pressable>
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
