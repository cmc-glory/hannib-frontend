import React from 'react'
import {View, Text, ScrollView, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {WixCalendar, CalendarItem} from '../../components/CalendarStack'

import {StackHeader, BellIcon, SeparatorLight} from '../../components/utils'
import * as theme from '../../theme'

export const Calendar = () => {
  return (
    <SafeAreaView style={styles.rootContainer} edges={['top', 'left', 'right']}>
      <StackHeader title="일정">
        <BellIcon />
      </StackHeader>
      <ScrollView>
        <View style={{paddingHorizontal: 10}}>
          <WixCalendar />
        </View>

        <View style={{paddingHorizontal: theme.PADDING_SIZE}}>
          <SeparatorLight style={{marginVertical: 20}} />

          <CalendarItem />
          <CalendarItem />
        </View>
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
