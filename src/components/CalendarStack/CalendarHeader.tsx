import React, {useCallback} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import moment from 'moment'

import LeftArrow from '../../assets/Icon/Left arrow.svg'
import RightArrow from '../../assets/Icon/Right arrow.svg'
import * as theme from '../../theme'

type CalendarHeaderProps = {
  date: string
  onPressLeft: ((method: () => void, month?: any) => void) | undefined
}

export const CalendarHeader = ({date}: CalendarHeaderProps) => {
  const onPressLeft = useCallback(() => {}, [])
  const onPressRight = useCallback(() => {}, [])
  return (
    <View style={[styles.container]}>
      <LeftArrow width={theme.ICON_SIZE} height={theme.ICON_SIZE} fill={theme.gray700} onPress={onPressLeft} />
      <Text style={[theme.styles.bold16, {color: theme.gray700}]}>{moment(date, 'YYYYMMDDHHmmss').format('YYYY MM')}</Text>
      <RightArrow width={theme.ICON_SIZE} height={theme.ICON_SIZE} fill={theme.gray700} onPress={onPressRight} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
})
