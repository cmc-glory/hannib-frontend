import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import moment from 'moment'
import {LocationIcon} from '../utils'
import {INanumDateDto} from '../../types'
import * as theme from '../../theme'

type SharingTimeLocationProps = {
  schedules: INanumDateDto[]
}

type SharingTimeLocationItemProps = {
  schedule: INanumDateDto
}

const SharingTimeLocationItem = ({schedule}: SharingTimeLocationItemProps) => {
  return (
    <View style={[theme.styles.rowSpaceBetween, {marginBottom: 12}]}>
      <Text style={{fontSize: 16, color: theme.gray700}}>{moment(schedule.acceptDate).format('YY.MM.DD HH:mm')}</Text>
      <View style={[theme.styles.rowFlexStart]}>
        <Text style={{fontSize: 16, marginRight: 8, color: theme.gray700}}>{schedule.location}</Text>
        <LocationIcon />
      </View>
    </View>
  )
}

export const SharingTimeLocation = ({schedules}: SharingTimeLocationProps) => {
  return (
    <View>
      {schedules?.map((schedule, index) => (
        <SharingTimeLocationItem key={index} schedule={schedule} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({})
