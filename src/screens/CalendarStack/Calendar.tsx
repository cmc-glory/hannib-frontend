import React from 'react'
import {View, Text, ScrollView, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {WixCalendar, CalendarItem} from '../../components/CalendarStack'

import {StackHeader, BellIcon} from '../../components/utils'
import * as theme from '../../theme'

export const Calendar = () => {
  return (
    <SafeAreaView style={styles.rootContainer} edges={['top', 'left', 'right']}>
      <StackHeader title="일정">
        <BellIcon />
      </StackHeader>
      <ScrollView style={{paddingHorizontal: 10}}>
        <WixCalendar />
        <CalendarItem />
        <CalendarItem />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: theme.white,
  },
})
